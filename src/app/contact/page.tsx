"use client";
import KooperParticles from "@/components/particles";
import { Curve } from "@/components/transition";
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
import React from "react";
const videos = [
  <Image
    key={"contact_1"}
    className="z-10 absolute bottom-0 right-0 w-1/3 object-cover lg:block hidden"
    draggable={false}
    priority
    style={{ maxHeight: "75%" }}
    width={1920}
    height={1080}
    src="/videos/contact_1.gif"
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
    src="/videos/contact_2.gif"
    alt="Contact Video"
  />,
];

interface FormDataValues {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: FormDataValues = {
      firstname: formData.get("firstname") as string,
      lastname: formData.get("lastname") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };
  };

  return (
    <Curve>
      <div className="flex items-center justify-center lg:py-0 py-12">
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
        <div className="container z-10 items-center justify-center flex h-screen">
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
            <Box as={"form"} onSubmit={handleSubmit}>
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
    </Curve>
  );
};

export default ContactPage;
