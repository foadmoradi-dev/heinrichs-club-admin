// src/components/product/CategorySelector.jsx
import React, { useMemo, useState } from "react";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

/**
 * Build tree from flat categories array
 * categories expected shape: [{ id, title, cat_parent }, ...]
 */
function buildTree(categories = []) {
    const map = {};
    categories.forEach((c) => {
        map[c.id] = { ...c, children: [] };
    });

    const roots = [];
    categories.forEach((c) => {
        if (!c.cat_parent || c.cat_parent === 0) {
            roots.push(map[c.id]);
        } else {
            if (map[c.cat_parent]) map[c.cat_parent].children.push(map[c.id]);
            else roots.push(map[c.id]); // fallback if parent missing
        }
    });

    return roots;
}

/**
 * CategorySelector
 * props:
 *  - categories: flat array from backend
 *  - selectedIds: array of selected category ids (e.g. [3,8,44])
 *  - setSelectedIds: setter function (replace array, not mutate)
 */
export default function CategorySelector({ categories = [], selectedIds = [], setSelectedIds = () => {} }) {
    const tree = useMemo(() => buildTree(categories), [categories]);

    // debug: uncomment to inspect values
    // console.log("CategorySelector", { categories, selectedIds, tree });

    return (
        <div className="space-y-1">
            {tree.map((node) => (
                <CategoryNode
                    key={node.id}
                    node={node}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                />
            ))}
        </div>
    );
}

function CategoryNode({ node, selectedIds = [], setSelectedIds }) {
    const [open, setOpen] = useState(false);

    const isSelected = selectedIds.includes(node.id);

    const toggleCheckbox = (e) => {
        e.stopPropagation(); // avoid toggling open when clicking checkbox
        // create a new array (immutable update)
        if (isSelected) {
            setSelectedIds(selectedIds.filter((id) => id !== node.id));
        } else {
            setSelectedIds([...selectedIds, node.id]);
        }
    };

    return (
        <div className="ml-0">
            <div className="flex items-center gap-2 py-1">
                {/* arrow */}
                {node.children?.length > 0 ? (
                    <button
                        type="button"
                        onClick={() => setOpen((s) => !s)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                        aria-expanded={open}
                        aria-controls={`cat-${node.id}`}
                    >
                        {open ? <FiChevronDown /> : <FiChevronRight />}
                    </button>
                ) : (
                    <span className="w-5" />
                )}

                {/* checkbox */}
                <input
                    id={`cat-checkbox-${node.id}`}
                    type="checkbox"
                    checked={isSelected}
                    onChange={toggleCheckbox}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />

                {/* label */}
                <label
                    htmlFor={`cat-checkbox-${node.id}`}
                    className="select-none cursor-pointer text-sm text-gray-800"
                    onClick={() => {
                        // clicking label should also toggle checkbox without toggling the folder open
                        // we'll call the same toggle handler
                        toggleCheckbox({ stopPropagation: () => {} });
                    }}
                >
                    {node.title ?? "---"}
                </label>
            </div>

            {/* children */}
            {open && node.children?.length > 0 && (
                <div id={`cat-${node.id}`} className="ml-5 border-l border-gray-100 pl-3">
                    {node.children.map((child) => (
                        <CategoryNode
                            key={child.id}
                            node={child}
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
