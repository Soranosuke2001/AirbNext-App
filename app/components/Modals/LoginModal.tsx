"use client";

import { FC, useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import useLoginModal from "@/app/Hooks/useLoginModal";
import useRegisterModal from "@/app/Hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginModalProps {}

const LoginModal: FC<LoginModalProps> = ({}) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', {
      redirect: false,
      ...data,
    })
      .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success("Welcome Back!");
          // router.refresh();
          loginModal.onClose();

          return router.push("/");
        }

        if (callback?.error) {
          toast.error("There was an error signing you in");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("error");
      })

    // try {
    //   const response = await signIn("credentials", {
    //     ...data,
    //     redirect: false,
    //   });

    //   console.log(response)

    //   if (response?.ok) {
    //     setIsLoading(false);

    //     toast.success("Welcome Back!");
    //     router.refresh();
    //     loginModal.onClose();
    //   } 

    // } catch (error) {
    //   toast.error("There was an error signing you in");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const toggleModal = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back!" subtitle="Login To Your Account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-center text-neutral-500 mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>Don't Have an Account?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggleModal}
          >
            Create Account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
