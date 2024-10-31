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
  tech: string[];
}

export default class ProjectCard extends React.Component<IProjectCardProps> {
  public render() {
    return (
      <Card maxW="sm" className="hover:shadow-lg shadow-sm w-full">
        <CardBody className="h-1/2">
          <Image
            src={this.props.image}
            alt="Portfolio Image"
            style={{ borderRadius: "lg" }}
            className="w-full h-64 object-contain"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
            loading={"lazy"}
            width={300}
            height={300}
          />
          <Stack mt="6" spacing="3" className="h-56">
            <Heading
              size="md"
              className="text-main font-bold text-center md:text-left"
            >
              {this.props.name}
            </Heading>
            <Text className="text-center md:text-left">
              {this.props.description}
            </Text>
            <div className="w-full max-w-[900px] mx-auto">
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {this.props.tech.map((tech, index) => (
                  <Text
                    key={index}
                    className="bg-gray-100 rounded-lg p-1 text-center"
                    fontSize={14}
                  >
                    {tech}
                  </Text>
                ))}
              </div>
            </div>
          </Stack>
        </CardBody>
        <CardFooter className="flex flex-row justify-center md:justify-start">
          <Link href={this.props.url} target="_blank">
            <ShimmerButton>View</ShimmerButton>
          </Link>
        </CardFooter>
      </Card>
    );
  }
}
