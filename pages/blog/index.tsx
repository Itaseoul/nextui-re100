import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import fs from "fs";
import React, { useState } from "react";
import { ArticleLayout } from "../../components/layout/article-layout";
import remarkGfm from "remark-gfm";
import { Box } from "../../components/styles/box";
import { Badge, FormElement, Input, Text } from "@nextui-org/react";
import { Flex } from "../../components/styles/flex";
import { BlogLayout } from "../../components/layout/blog-layout";
import { SearchIcon } from "../../components/icons/search-icon";
import Link from "next/link";
import { timeAgo } from "../../components/utils/timeago";

type Frontmatter = {
  title: string;
  date: Date;
  description: string;
  slug: string;
};

interface Props {
  sources: Frontmatter[];
}

const Blog = ({ sources }: Props) => {
  const [blogs, setBlogs] = useState(sources);

  const handleSearch = (e: React.ChangeEvent<FormElement>) => {
    const value = e.target.value;
    //  setSearch(value);
    const filteredBlogs = sources.filter((blog) =>
      blog.title.toLowerCase().includes(value.toLowerCase())
    );
    setBlogs(filteredBlogs);
  };

  return (
    <BlogLayout>
      <Flex direction={"column"} css={{}}>
        <Text h1 css={{ textGradient: "45deg, $blue600 -20%, $pink600 50%", }}>설명서</Text>
        <Text span css={{ color: "$accents8" }}>
          베타 버전 입니다.
        </Text>
        <Box css={{ my: "$8" }}>
          <Input
            placeholder="검색하기"
            css={{
              width: "100%",
              "& .nextui-input-wrapper": {
                bc: "$accents2",
              },
            }}
            contentRight={<SearchIcon />}
            onChange={handleSearch}
          />
        </Box>

        <Text h3 css={{ mt: "$10" }}>전체</Text>

        <Flex direction={"column"} gap={"lg"}>
          {blogs.length === 0 && (
            <Text span css={{ color: "$accents8" }}>
              No results found
            </Text>
          )}
          {blogs.map((item) => (
            <Link href={`blog/${item.slug}`} key={item.slug}>
              <Flex
                direction={"column"}
                css={{
                  backgroundColor: "$accents1",
                  py: "$12",
                  px: "$7",
                  cursor: "pointer",
                  borderRadius: "$sm",
                  "&:hover": {
                    bc: "$accents1",
                  },
                }}
              >
                <Flex gap={"xl"}>
                  <Text h4>{item.title}</Text>
                  <Text
                    span
                    css={{
                      border: "none",
                      height: "fit-content",
                      mt: "3px",
                      color: "$accents7",
                    }}
                  >
                    {timeAgo(item.date)}
                  </Text>
                </Flex>

                <Text span css={{ color: "$accents8" }}>
                  {item.description}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Flex>
    </BlogLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const baseUrl = path.join(process.cwd(), "blog/content");
  const files = fs.readdirSync(path.join("blog/content"));

  const frontMatters = await Promise.all(
    files.map(async (file) => {
      const sourceFile = fs.readFileSync(
        path.join(baseUrl + `/${file}`),
        "utf8"
      );
      const mdxSource = await serialize(sourceFile, {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      });
      // @ts-ignore
      mdxSource.frontmatter.slug = file.replace(".mdx", "");
      return mdxSource.frontmatter;
    })
  );

  return {
    props: {
      sources: JSON.parse(JSON.stringify(frontMatters)),
    },
  };
};

export default Blog;
