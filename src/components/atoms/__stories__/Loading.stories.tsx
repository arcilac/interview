import type { Meta, StoryObj } from '@storybook/react'
import { Loading } from '../Loading'

const meta = {
  title: 'Atoms/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // NOTE: Controls for props in Storybook UI
  argTypes: {
    text: {
      control: 'text',
      description: 'Loading text to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Loading...',
  },
}

export const CustomText: Story = {
  args: {
    text: 'Fetching countries...',
  },
}

export const WithCustomClass: Story = {
  args: {
    text: 'Loading data',
    className: 'custom-loading',
  },
}
