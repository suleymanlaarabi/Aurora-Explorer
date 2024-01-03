import { Flex, Heading } from "@chakra-ui/react";

interface NavBarHeaderProps {
  name: string;
}

const NavBarHeader = ({ name }: NavBarHeaderProps) => {
  return (
    <>
      <Flex gap={5} alignItems={"center"}>
        <Heading fontSize={"30px"}>{name}</Heading>
      </Flex>
      <Flex />
    </>
  );
};

export default NavBarHeader;
