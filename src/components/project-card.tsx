import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  CardFooter,
  IconButton,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import ShimmerButton from "./ui/shimmer-button";

export interface IProjectCardProps {
  name: string;
  description: string;
  image: string;
  url: string;
}

export default class ProjectCard extends React.Component<IProjectCardProps> {
  public render() {
    return (
      <Link href={this.props.url} target="_blank">
        <Card maxW="sm" className="hover:shadow-lg shadow-sm h-full">
          <CardBody className="h-1/3">
            <Image
              src={this.props.image}
              alt="Portfolio Image"
              style={{ borderRadius: "lg" }}
              className="w-full h-64 object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
              loading={"lazy"}
              width={300}
              height={300}
            />
            <Stack mt="6" spacing="3" className="h-56">
              <Heading size="md" className="text-main text-center font-bold">
                {this.props.name}
              </Heading>
              <Text
                overflowY="scroll"
                css={{
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  "-ms-overflow-style": "none",
                  "scrollbar-width": "none",
                }}
              >
                {this.props.description}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter className="flex flex-row justify-center">
            <ShimmerButton>View</ShimmerButton>
          </CardFooter>
        </Card>
      </Link>
    );
  }
}
