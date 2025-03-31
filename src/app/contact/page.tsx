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
import contact1video from "@/../public/videos/contact_1.gif";
import contact2video from "@/../public/videos/contact_2.gif";
import React, { useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

interface FormDataValues {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  gRecaptchaToken: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const ContactPage = () => {
  const router = useRouter();
  const [randomGif] = useState(() => Math.random() < 0.5 ? contact1video : contact2video);

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

    executeRecaptcha("inquirySubmit").then((gRecaptchaToken) => {
      const data: FormDataValues = {
        firstname: formData.get("firstname") as string,
        lastname: formData.get("lastname") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
        gRecaptchaToken: gRecaptchaToken,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      
      <Image
        className="top-0 left-0 absolute object-cover w-screen h-screen opacity-20"
        priority
        draggable={false}
        src="/images/banner.svg"
        width={1920}
        height={1080}
        alt={"Banner Image"}
      />
      <KooperParticles />
      
      <Image
        className="z-10 absolute bottom-0 right-0 w-1/3 object-cover lg:block hidden"
        draggable={false}
        priority
        style={{ maxHeight: "75%" }}
        width={1920}
        height={1080}
        src={randomGif}
        alt="Contact Video"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pt-32 pb-16 relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center"
      >
        <div className="flex justify-center w-full">
          <Stack
            bg={"gray.800/50"}
            backdropBlur="md"
            rounded={"xl"}
            p={{ base: 6, sm: 8, md: 10 }}
            spacing={{ base: 8 }}
            className="w-full max-w-2xl border border-gray-700/50 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 hover:border-blue-400/50"
          >
            <Stack spacing={4}>
              <Heading
                color={"white"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                className="text-center"
              >
                Contact Kooper
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, blue.400, purple.500)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Text color={"gray.300"} fontSize={{ base: "sm", sm: "md" }} className="text-center">
                I'm always looking for new opportunities to collaborate with
                others. Whether you're looking for a new website, a new feature,
                or just want to chat, I'm always open to new ideas. Alternatively,
                you can email me at{" "}
                <a href="mailto:koopercodes@gmail.com" className="text-blue-400 hover:text-blue-300">
                  koopercodes@gmail.com
                </a>.
              </Text>
            </Stack>
            <Box as={"form"} ref={formRef} id="contact" onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Input
                  id="firstname"
                  placeholder="First Name"
                  bg={"gray.700/50"}
                  border={0}
                  color={"white"}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  _hover={{
                    bg: "gray.700/70",
                  }}
                  _focus={{
                    bg: "gray.700/70",
                    borderColor: "blue.400",
                  }}
                />
                <Input
                  id="lastname"
                  placeholder="Last Name"
                  bg={"gray.700/50"}
                  border={0}
                  color={"white"}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  _hover={{
                    bg: "gray.700/70",
                  }}
                  _focus={{
                    bg: "gray.700/70",
                    borderColor: "blue.400",
                  }}
                />
                <Input
                  id="email"
                  placeholder="Email"
                  bg={"gray.700/50"}
                  border={0}
                  type="email"
                  color={"white"}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  _hover={{
                    bg: "gray.700/70",
                  }}
                  _focus={{
                    bg: "gray.700/70",
                    borderColor: "blue.400",
                  }}
                />
                <Textarea
                  id="message"
                  placeholder="Message"
                  bg={"gray.700/50"}
                  border={0}
                  color={"white"}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  _hover={{
                    bg: "gray.700/70",
                  }}
                  _focus={{
                    bg: "gray.700/70",
                    borderColor: "blue.400",
                  }}
                />
              </Stack>
              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, blue.500, purple.500)"
                color={"white"}
                type="submit"
                _hover={{
                  bgGradient: "linear(to-r, blue.600, purple.600)",
                  boxShadow: "xl",
                  transform: "scale(1.02)",
                }}
                transition="all 0.3s"
                size="lg"
                fontSize="lg"
                py={6}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
