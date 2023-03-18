import { Text, Avatar, Card, Button, Link, Grid } from "@nextui-org/react";
import { Box } from "../../styles/box";
import { Flex } from "../../styles/flex";
import { GithubIcon } from "../../icons/github-icon";
import { LinkedinIcon } from "../../icons/linkedin-icon";
import { SectionAnimation } from "../../animations/section";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { LinkIcon } from "../../icons/link-icon";
import { GridContainer } from "../../styles/grid";

export const Home = () => {
  const router = useRouter();

  return (
    <Box css={{ px: "$12", "@xsMax": { px: "$10" }, width: "100%" }}>
      {/* <Card variant="flat" css={{ marginBottom: "$1" }}>
        <Card.Body css={{ backgroundColor: "$green200" }}>
          <Text h6 css={{ fontFamily: "inherit", textAlign: "center" }} as={"p"}>
            RE100Run(ALPHA) 에 오신것을 환영합니다.
          </Text>
        </Card.Body>
      </Card> */}
      <Flex justify={"between"} css={{ pb: "$10" }}>
        <Box css={{ alignSelf: "center" }}>
          <Text h1 css={{
            my: "$2",
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
            weight: "bold"
          }}>
            리백런
          </Text>
          <Text css={{ fontFamily: "inherit" }}>
            에너지절약 이니셔티브 러닝
          </Text>
        </Box>

        <Avatar
          css={{ "--nextui--avatarXl": "7.5rem" }}
          pointer
          bordered

          size={"xl"}
          src="./RE100.png"
        />
      </Flex>
      <SectionAnimation delay={0.1}>
        <Box css={{ mb: "$2xl", mt: "$2xl" }}>
          <Text h3>설명</Text>
          <Text
            span
            css={{
              textIndent: "1em",
              lineHeight: "2em",
              display: "block",
              color: "darkgray",
            }}
          >
            에너지 절약 이니셔티브인 RE100Run을 소개합니다. 이 프로젝트는 보다 지속 가능한 미래를 만들기 위해 노력하는 열정적인 개인 그룹의 아이디어입니다. 목표는 간단합니다. 재활용 PET 병으로 만든 소규모 풍력 터빈을 사용하여 풍력 에너지의 힘을 활용하는 것입니다. 이 프로젝트는 오래된 모터를 역회전시켜 풍력 에너지를 생성하는 데 사용함으로써 팀은 지속 가능하고 환경 친화적인 방식으로 전기를 생산할 수 있습니다. 커뮤니티의 도움으로 팀은 함께 터빈을 작동하고 에너지를 생성하여 한 번에 한 단계씩 세상을 밝힐 계획입니다. RE100Run은 에너지를 생성하는 것뿐만 아니라 생성된 에너지를 추적하는 것입니다. 팀은 터빈에서 생성된 모든 에너지를 기록하고 서버에 저장하여 참가자가 기여도를 추적하고 노력의 영향을 모니터링할 수 있도록 합니다. RE100Run 팀은 지속 가능한 에너지의 메시지를 전파하는 데 열정적이며 이 프로젝트를 글로벌 캠페인으로 전환하기로 결정했습니다. 커뮤니티의 지원을 통해 다른 사람들이 노력에 동참하고 환경에 긍정적인 영향을 미치도록 격려할 수 있기를 바랍니다. 이 혁신적인 프로젝트는 에너지 생산 및 지속 가능성에 대한 우리의 사고 방식을 혁신할 수 있는 잠재력을 가지고 있습니다. RE100-Run은 재활용 재료와 지역 사회 참여를 활용하여 보다 지속 가능한 미래를 위한 길을 닦고 있습니다. 관심을 끌고 전 세계 커뮤니티에 변화를 가져오는 이 흥미진진한 이니셔티브에 주목해 주세요.
          </Text>




          <Flex justify={"center"} css={{ mt: "$8" }}>
            <NextLink href="/projects" >
              <Link block css={{ gap: "$4" }}>
                <Button flat color="success" auto>업사이클</Button>
              </Link>
            </NextLink>
            <NextLink href="/blog">
              <Link block css={{ gap: "$4" }}>
                <Button bordered color="success" auto>시작</Button>
              </Link>
            </NextLink>
          </Flex>



        </Box>
      </SectionAnimation>



      <SectionAnimation delay={0.3}>
        <Box css={{ mb: "$2xl", mt: "$2xl" }}>
          <Text h3>재료</Text>
          <GridContainer
            as={"ul"}
            gap={"md"}
            css={{
              m: 0,
              px: 0,
              gridTemplateColumns: "repeat(4, 1fr)",
              "@xsMax": {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
            }}
          >
            <Box as={"li"}>페트병(커피)</Box>
            <Box as={"li"}>모터(폐전자제품)</Box>
            <Box as={"li"}>플라스틱용기(화장품)</Box>
            <Box as={"li"}>LED(폐전자제품)</Box>
            <Box as={"li"}>NodeMCU</Box>
            <Box as={"li"}>TypeScript</Box>
            <Box as={"li"}>C/Javascript</Box>
            <Box as={"li"}>Firebase</Box>

          </GridContainer>
        </Box>
      </SectionAnimation>



      <SectionAnimation delay={0.3}>
        <Box css={{ mb: "$10" }}>
          <Text h3>링크</Text>
          <Box as={"ul"} css={{ m: 0 }}>
            <Box as={"li"}>
              <Link
                block
                target={"_blank"}
                color="primary"
                href="https://itaseoul.org/"
              >
                <Button
                  light
                  color="primary"
                  auto
                  icon={<GithubIcon />}
                  ripple={false}
                  css={{ pl: "$3" }}
                >
                  @이타서울
                </Button>
              </Link>
            </Box>
            <Box as={"li"}>
              <Link
                block
                target={"_blank"}
                color="primary"
                href="https://www.instagram.com/itaseoul/"
              >
                <Button
                  light
                  color="primary"
                  auto
                  icon={<LinkedinIcon />}
                  ripple={false}
                  css={{ pl: "$3" }}
                >
                  @이타서울
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </SectionAnimation>
    </Box>
  );
};
