import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function DescriptionsTab({ control }) {
    return (
        <div className="space-y-6">
            {/* SHORT DESCRIPTION */}
            <div>
                <label className="text-sm font-medium mb-1 block">Short Description</label>
                <Controller
                    name="product_short_desc"
                    control={control}
                    render={({ field }) => (
                        <Editor
                            apiKey="azmhwli7oc2nwxuenr1z7ecmvu2xh8x6dh5b7hvi7djgxf8s"
                            value={field.value}
                            init={{
                                height: 200,
                                menubar: false,
                                plugins: "link lists",
                                toolbar:
                                    "undo redo | bold italic underline | bullist numlist | link",
                            }}
                            onEditorChange={field.onChange} // react-hook-form integration
                        />
                    )}
                />
            </div>

            {/* LONG DESCRIPTION */}
            <div>
                <label className="text-sm font-medium mb-1 block">Long Description</label>
                <Controller
                    name="product_long_desc"
                    control={control}
                    render={({ field }) => (
                        <Editor
                            apiKey="azmhwli7oc2nwxuenr1z7ecmvu2xh8x6dh5b7hvi7djgxf8s"
                            value={field.value}
                            init={{
                                height: 350,
                                menubar: true,
                                plugins:
                                    "link lists image table code fullscreen autoresize",
                                toolbar:
                                    "undo redo | blocks | bold italic underline | " +
                                    "alignleft aligncenter alignright | bullist numlist | " +
                                    "link image table | code fullscreen",
                            }}
                            onEditorChange={field.onChange}
                        />
                    )}
                />
            </div>
        </div>
    );
}
