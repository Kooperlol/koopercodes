"use client";
import KooperParticles from "@/components/particles";
import {
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Image from "next/image";
import {
  useGoogleReCaptcha,
  withGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import contact1video from "@/../public/videos/contact_1.gif";
import contact2video from "@/../public/videos/contact_2.gif";
import React, { useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

interface FormDataValues {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  gRecaptchaToken: string;
}

const ContactPage = () => {
  const videos = [
    <Image
      key={"contact_1"}
      className="z-10 absolute bottom-0 right-0 w-1/3 object-cover lg:block hidden"
      draggable={false}
      priority
      style={{ maxHeight: "75%" }}
      width={1920}
      height={1080}
      src={contact1video}
      alt="Contact Video"
    />,
    <Image
      key={"contact_2"}
      className="z-10 absolute bottom-0 right-0 w-1/4 object-cover lg:block hidden"
      draggable={false}
      priority
      style={{ maxHeight: "75%" }}
      width={1920}
      height={1080}
      src={contact2video}
      alt="Contact Video"
    />,
  ];

  const toast = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formRef = useRef<HTMLFormElement>(null);
  const [isEmailing, setEmailing] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmailing) {
      return;
    }

    setEmailing(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    formData.append("firstname", e.currentTarget.firstname.value.trim());
    formData.append("lastname", e.currentTarget.lastname.value.trim());
    formData.append("email", e.currentTarget.email.value.trim());
    formData.append("message", e.currentTarget.message.value.trim());

    if (
      !formData.get("firstname") ||
      !formData.get("lastname") ||
      !formData.get("email") ||
      !formData.get("message")
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill out all fields before submitting.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setEmailing(false);
      return;
    }

    if (!executeRecaptcha) {
      console.log("Execute recaptcha not available yet");
      alert(
        "Execute recaptcha not available yet likely meaning key not recaptcha key not set"
      );
      return;
    }

    executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
      const data: FormDataValues = {
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        gRecaptchaToken: gReCaptchaToken,
      };
      const sendEmail = async () => {
        const response = await axios.post("/api/email", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        formRef.current?.reset();
        if (response?.data?.success === false) {
          toast({
            title: "Failed to send email",
            description:
              "We were unable to send your email. Please try again later.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Email sent",
            description: "Your email has been sent successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
        setEmailing(false);
      };
      sendEmail();
    });
  };

  return (
    <div className="flex items-center justify-center">
      <Image
        className="top-0 left-0 absolute object-cover w-screen h-screen"
        priority
        draggable={false}
        src="/images/banner.svg"
        fill
        alt={"Banner Image"}
      />
      {videos[Math.floor(Math.random() * videos.length)]}

      <KooperParticles />
      <div className="container z-10 items-center justify-center flex h-screen py-12">
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          className="w-2/3 max-w-lg"
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Contact Kooper
              <Text
                as={"span"}
                bgGradient="linear(to-r, blue.400,blue.600)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              I'm always looking for new opportunities to collaborate with
              others. Whether you're looking for a new website, a new feature,
              or just want to chat, I'm always open to new ideas.
            </Text>
          </Stack>
          <Box as={"form"} ref={formRef} id="contact" onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Input
                id="firstname"
                placeholder="First Name"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                id="lastname"
                placeholder="Last Name"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Input
                id="email"
                placeholder="Email"
                bg={"gray.100"}
                border={0}
                type="email"
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
              <Textarea
                id="message"
                placeholder="Message"
                bg={"gray.100"}
                border={0}
                color={"gray.500"}
                _placeholder={{
                  color: "gray.500",
                }}
              />
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, blue.400,blue.600)"
              color={"white"}
              type="submit"
              _hover={{
                bgGradient: "linear(to-r, blue.400,blue.600)",
                boxShadow: "xl",
              }}
            >
              Submit
            </Button>
          </Box>
          form
        </Stack>
      </div>
    </div>
  );
};

export default withGoogleReCaptcha(ContactPage);
