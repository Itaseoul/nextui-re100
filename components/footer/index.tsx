import { Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';

export const Footer = () => {
   return (
      <Box>
         <Spacer css={{ pt: '$16', mt: '0 !important' }} />
         <Flex justify={'center'}>
            <Text h6 span>© 2023 RE100RUN. All Rights Reserved.</Text>
         </Flex>
         <Spacer y={2} />
      </Box>
   );
};
