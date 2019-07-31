import * as React from 'react';
import { css } from 'aphrodite';
import { Box, Card, Column, Divider, Heading, Image, Text, Touchable } from 'gestalt';
import { Placeholder } from 'semantic-ui-react';
import 'gestalt/dist/gestalt.css';
import { Route } from 'react-router';

import IBlog from '../../../custom/interface/IBlog';

import BlogStyle from '../../../styles/blog/BlogStyle';

import types, { IS_SM } from '../../../custom/types';

interface IProps {
  blogs: IBlog[];
  loading: boolean;
}

interface IState {
  activeBlog: number;
}

class BlogHeader extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      activeBlog: 0,
    };
  }

  renderBannerPlaceholder() {
    const {} = this.state;
    return (
      <Box
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="start"
        padding={6}
        height="100%"
      >
        <Placeholder className={css(BlogStyle.blogHeaderPlaceholderSize)}>
          <Placeholder.Image square />
        </Placeholder>
        <Placeholder className={css(BlogStyle.blogHeaderContentPlaceholderSize)}>
          <Placeholder.Header>
            <Placeholder.Line length="very short" />
            <Placeholder.Line length="medium" />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length="short" />
          </Placeholder.Paragraph>
        </Placeholder>
      </Box>
    );
  }

  renderStoriesPlaceholder() {
    const {} = this.state;
    return (
      <Box paddingY={5} paddingX={3}>
        {Array.from(Array(2).keys()).map((i: number) => (
          <Box key={`top_stories_placeholder${i}`} paddingY={1}>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Box>
        ))}
      </Box>
    );
  }

  renderStoryCard() {
    const { blogs } = this.props;
    return blogs.map((blog: IBlog, index: number) => {
      return (
        <Touchable
          onTouch={() => {
            this.setState({
              activeBlog: index,
            });
          }}
          shape="rounded"
          key={index}
        >
          <Box paddingY={2} shape="rounded" overflow="hidden">
            <Card>
              <Box display="flex" direction="row" alignItems="center">
                <Box
                  shape={IS_SM ? 'rounded' : 'square'}
                  color={types.COLOR_TOP_STORIES[index] as any}
                  padding={3}
                  smPadding={6}
                >
                  <Text size="lg" smSize="xl" color="white" bold>
                    {index + 1}
                  </Text>
                </Box>
                <Box paddingX={1} />
                <Box paddingX={1}>
                  <Box padding={1}>
                    <Text smSize="lg" bold>
                      {blog.tags[0]}
                    </Text>
                  </Box>
                  <Box padding={1}>
                    <Text size="sm" smSize="md">
                      {blog.titlePreview}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Box>
        </Touchable>
      );
    });
  }

  renderTopStories() {
    const {} = this.state;
    return (
      <Box
        display="flex"
        direction="column"
        color="white"
        overflow="auto"
        height={IS_SM ? types.DEFAULT_BLOG_CONTAINER_SIZE.height : '100%'}
        alignItems="center"
      >
        <Box paddingY={1} smPaddingY={2} marginTop={1} smMarginTop={3}>
          <Text mdSize="lg" size="md" bold align="center">
            Top Stories
          </Text>
        </Box>
        <Divider />
        <Box paddingX={2} smPaddingX={3}>
          {this.renderStoryCard()}
        </Box>
        <Box paddingY={1} smPaddingY={2} />
      </Box>
    );
  }

  renderBanner() {
    const { blogs } = this.props;
    const { activeBlog } = this.state;

    const blog = blogs[activeBlog];
    return (
      <Route
        render={({ history }) => (
          <Touchable
            onTouch={() => {
              history.push(`/blog/${blog.id}`);
            }}
          >
            <Box position="relative" height={types.DEFAULT_BLOG_CONTAINER_SIZE.height}>
              <Image
                alt={blog.title}
                color="pine"
                src={blog.blobUri}
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
              >
                <div
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100%', width: '100%' }}
                />
              </Image>
              <Box smPadding={8} padding={4} position="absolute" left bottom>
                <Box display="none" smDisplay="block">
                  <Heading color="white" size="xs">
                    {blog.title}
                  </Heading>
                </Box>
                <Box display="block" smDisplay="none">
                  <Text color="white" bold size="xl">
                    {blog.title}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Touchable>
        )}
      />
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <Box display="flex" direction="row" color="white" overflow="hidden" shape="rounded" wrap>
        <Column span={12} mdSpan={8}>
          {loading ? this.renderBannerPlaceholder() : this.renderBanner()}
        </Column>
        <Column span={12} mdSpan={4}>
          {loading ? this.renderStoriesPlaceholder() : this.renderTopStories()}
        </Column>
      </Box>
    );
  }
}

export default BlogHeader;
