import { Text, Avatar, Card, Button, Link } from "@nextui-org/react";
import { Box } from "../../styles/box";
import React from 'react'
import { SectionAnimation } from '../../animations/section'
import { GridContainer } from "../../styles/grid";

type Props = {}

export default function Bio({ }: Props) {
  return (
    <>
      <SectionAnimation delay={0.2}>
        <Box css={{ mb: "$10" }}>
          <Text h3>Bio</Text>

          <Box as={"ul"} css={{ m: 0 }}>
            <Box as={"li"} css={{ textIndent: "-3.4em", pl: "3.4em" }}>
              <Text span css={{ mr: "1em" }} weight={"bold"}>
                1999
              </Text>
              <Text span>Born in Cortes, Honduras.</Text>
            </Box>
            <Box as={"li"} css={{ textIndent: "-3.4em", pl: "3.4em" }}>
              <Text span css={{ mr: "1em" }} weight={"bold"}>
                2018 - 2022
              </Text>
              <Text span>Bachelor&apos;s degree in Computer Science.</Text>
            </Box>
            <Box as={"li"} css={{ textIndent: "-3.4em", pl: "3.4em" }}>
              <Text span css={{ mr: "1em" }} weight={"bold"}>
                2020 - 2022
              </Text>
              <Text span>Freelancer as a Software Developer.</Text>
            </Box>
            <Box as={"li"} css={{ textIndent: "-3.4em", pl: "3.4em" }}>
              <Text span css={{ mr: "1em" }} weight={"bold"}>
                2022 - Present
              </Text>
              <Text span>Work as a Software Engineer at CodeExitos.</Text>
            </Box>
          </Box>
        </Box>
      </SectionAnimation>

      <SectionAnimation delay={0.3}>
        <Box css={{ mb: "$10" }}>
          <Text h3>I ❤️ </Text>
          <Text as={"span"} css={{ textIndent: "1em" }}>
            I love to learn new things, I am passionate about technology and I
            always try to learn something new every day, I love to solve
            problems and I am always looking for new challenges.
          </Text>
        </Box>
      </SectionAnimation>

      <SectionAnimation delay={0.3}>
        <Box css={{ mb: "$10" }}>
          <Text h3>Languages</Text>
          <GridContainer as={"ul"} gap={"md"} css={{ m: 0, px: 0 }}>
            <Box as={"li"}>Spanish </Box>
            <Box as={"li"}>English </Box>
          </GridContainer>
        </Box>
      </SectionAnimation>
    </>
  )
}