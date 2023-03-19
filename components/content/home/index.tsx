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
import { BsSkipStartBtn, BsViewList } from "react-icons/bs";

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
            에너지 절약 이니셔티브 러닝
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
              whiteSpace: "pre-line",
            }}
          >RE100Run은 에너지 절약 이니셔티브로서, 지속 가능한 미래를 위한 에너지 발전 러닝 캠페인 아이디어 입니다. 이타서울 사회공헌팀은 22년 재활용 PET 병과 폐가전제품과 폐장난감의 모터,부품을 사용해 만든 마이크로 풍력 발전기를 만들었습니다. 캠페인 러너들은 본 소형발전기를 들고 달립니다. 바람이 모터를 역회전시켜 얻는 작은 풍력 에너지를 만들고, 생성된 에너지를 서버에 저장하여 참가자가 기여도를 추적하고 노력의 영향을 모니터링할 수 있도록 합니다.

            RE100Run 팀은 지속 가능한 미래에너지를 위한 인식확산을 위해, 일련의 준비를 거쳐 23년도 RE100Run을 공개 캠페인으로 전환할 예정입니다. 우리는 독특한 캠페인 체험이 에너지 생산 및 지속 가능성에 대한 미래세대의 사고 방식을 혁신할 수 있는 잠재력을 가지고 있다고 확신합니다.나아가 RE100Run 프로그램은 재활용 전기/전자 재료와 지역 사회 커뮤니티 교육으로 확산되어 보다 지속 가능한 미래를 위한 동기가 될 수 있습니다.
          </Text>




          <Flex justify={"center"} css={{ mt: "$8" }}>
            <NextLink href="/run" passHref >
              <Link block css={{ gap: "$4" }}>
                <Button flat color="success" auto><BsSkipStartBtn />{" "}시작하기</Button>
              </Link>
            </NextLink>
            <NextLink href="/blog" passHref >
              <Link block css={{ gap: "$4" }}>
                <Button bordered color="success" auto><BsViewList />{" "}사용법보기</Button>
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
