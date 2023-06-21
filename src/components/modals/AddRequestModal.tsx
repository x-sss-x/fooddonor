"use client";

import { SupaClient } from "@/utils/supabase";
import { Button, Modal, TextInput } from "flowbite-react";
import { Formik, Field, FieldArray } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

const initialState = {
  items: [
    {
      name: "",
      quantity: "",
    },
  ],
};

export default function AddRequestsModal() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const session = useSession();

  return (
    <div ref={rootRef}>
      <Modal
        root={rootRef.current ?? undefined}
        show={true}
        size="xl"
        popup
        onClose={() => router.back()}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add Request Post
            </h3>

            <Formik
              initialValues={initialState}
              onSubmit={async (values) => {
                const responsePost = await SupaClient.from("Posts")
                  .insert({ type: "RESOURCE", userId: session.data?.user?.id })
                  .select("id")
                  .single();
                const feedData = values.items.map((value) => ({
                  ...value,
                  postsId: responsePost.data?.id,
                }));

                const responseList = await SupaClient.from("List").insert(
                  feedData
                );

                if (!responsePost.error && !responseList.error) {
                  router.back();
                  router.refresh();
                }
              }}
            >
              {({ values, isSubmitting, handleSubmit, ...props }) => (
                <FieldArray name="items">
                  {({ remove, push }) => (
                    <React.Fragment>
                      {values.items.map((field, index) => (
                        <div key={index} className="flex gap-2 w-full px-3">
                          <Field
                            as={TextInput}
                            {...props}
                            name={`items[${index}].name`}
                            type="text"
                            placeholder="item name"
                            required
                          />
                          <Field
                            as={TextInput}
                            {...props}
                            name={`items[${index}].quantity`}
                            type="text"
                            placeholder="quantity"
                            required
                          />
                          {index !== 0 ? (
                            <Button
                              color={"gray"}
                              onClick={() => remove(index)}
                            >
                              X
                            </Button>
                          ) : (
                            <div className="w-12"></div>
                          )}
                        </div>
                      ))}
                      <div className="w-full px-10 flex flex-col gap-2">
                        <Button
                          disabled={isSubmitting}
                          onClick={() => push({ name: "", quantity: "" })}
                          className="w-full"
                          color={"gray"}
                        >
                          Add Item
                        </Button>
                        <Button
                          processingLabel="Posting..."
                          isProcessing={isSubmitting}
                          className="w-full"
                          onClick={() => handleSubmit()}
                        >
                          Post
                        </Button>
                      </div>
                    </React.Fragment>
                  )}
                </FieldArray>
              )}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
