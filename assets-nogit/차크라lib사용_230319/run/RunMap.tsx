import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { memo } from "react";
import { BiArrowFromRight } from "react-icons/bi";
import { FaMoon, FaRunning, FaSun, FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Map from "../../../track/components/Map/Map";
import Stats from "../../../track/components/Stats/Stats";
// import { useAuth } from "../context/AuthProvider";
import { setMapDrawer } from "../../../track/store/map/map";
import GetPowerStream from "./GetPowerStream";

function RunMap() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.400", "gray.900");
  const color = useColorModeValue("gray.900", "gray.400");

  // const { signOut } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSignOut() {
    // await signOut();
    router.reload();
  }

  function openDrawer() {
    dispatch(setMapDrawer(true));
  }

  return (

    <Box position="absolute" top='0' left='0' right='0' overflow="hidden" color={color} bg="#16181a">

      <Box h="100vh" p="20px" overflowY="scroll" overflowX="hidden" alignItems="flex-end" >
        {/* <Stats /> */}
        <Flex h="100%" alignItems='flex-end' justifyContent='center' gap='2' p="20px">
          <Center>

            <IconButton
              aria-label="button"
              onClick={openDrawer}
              h="200px"
              w="200px"
              isRound={true}
              bgColor="#17c964"
              color="white"
              icon={<FaRunning fontSize="100px" />}
            />
            {/* <Text fontSize='3xl'>GPS</Text> */}
          </Center>
        </Flex>

      </Box>

      <Map />
    </Box>
  );
}

export default memo(RunMap);
