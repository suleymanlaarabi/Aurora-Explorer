import React, { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  Grid,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import * as Icons from "react-icons/fi";

interface IconDrawerSelectorProps {
  onIconSelect: (iconName: JSX.Element) => void;
}

const IconDrawerSelector = ({ onIconSelect }: IconDrawerSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const iconComponents = Object.entries(Icons);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const handleIconClick = (icon: JSX.Element) => {
    onIconSelect(icon);
    closeDrawer();
  };

  return (
    <>
      <Button onClick={openDrawer}>Add Icon</Button>
      <Drawer isOpen={isOpen} placement="right" onClose={closeDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Heading py={4} textAlign={"center"}>
              Select Icon
            </Heading>
            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
              {iconComponents.map(([iconName, IconComponent]) => (
                <IconButton
                  key={iconName}
                  aria-label="Search database"
                  icon={<IconComponent fontSize={"24"} />}
                  onClick={() =>
                    handleIconClick(<IconComponent fontSize={"24"} />)
                  }
                />
              ))}
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default IconDrawerSelector;
