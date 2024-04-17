import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

export interface IProjectCardProps {
  name: string;
  description: string;
  image: string;
  url: string;
  date: string;
}

export default class ProjectCard extends React.Component<IProjectCardProps> {
  public render() {
    return (
      <Link href={this.props.url} target="_blank">
        <Card maxW="sm" className="hover:shadow-lg h-full">
          <CardBody className="h-1/3">
            <img
              src={this.props.image}
              alt="Portfolio Image"
              style={{ borderRadius: "lg" }}
              className="w-full h-64 object-cover"
            />
            <Stack mt="6" spacing="3" className="h-56">
              <Heading size="md" className="text-main font-bold">{this.props.name} - {this.props.date}</Heading>
              <Text overflowY={"scroll"}>{this.props.description}</Text>
            </Stack>
          </CardBody>
        </Card>
      </Link>
    );
  }
}
