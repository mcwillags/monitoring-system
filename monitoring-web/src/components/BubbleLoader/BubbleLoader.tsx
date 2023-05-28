import { Box } from '@mui/material';

import styled from '@emotion/styled';

import { keyframes } from '@emotion/react';

interface BubbleLoaderProps {
  size?: number;
}

export const BubbleLoader = ({ size = 24 }: BubbleLoaderProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
      <Bubble $size={size} $delay={0} />
      <Bubble $size={size} $delay={200} />
      <Bubble $size={size} $delay={400} />
    </Box>
  );
};

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
    transform: scale(0.6);
  }
`;

const Bubble = styled(Box)<{ $delay: number; $size: number }>`
  animation: ${fadeOut} 1s ${({ $delay }) => $delay + 'ms' ?? '0ms'} infinite ease-in-out alternate;
  width: ${({ $size }) => ($size ? $size + 'px' : '30px')};
  height: ${({ $size }) => ($size ? $size + 'px' : '30px')};
  background: rgb(25, 118, 210);
  border-radius: 50%;
`;
