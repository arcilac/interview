import type { Meta, StoryObj } from '@storybook/react'
import { ThemeToggleBase } from '../ThemeToggleBase'
import { useState } from 'react'

const meta = {
  title: 'Atoms/ThemeToggle',
  component: ThemeToggleBase,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // NOTE: Controls for props in Storybook UI
  argTypes: {
    isDarkMode: {
      control: 'boolean',
      description: 'Current theme mode',
    },
    onToggle: {
      action: 'toggle',
      description: 'Callback function called when toggle is clicked',
    },
  },
} satisfies Meta<typeof ThemeToggleBase>

export default meta
type Story = StoryObj<typeof meta>

export const LightMode: Story = {
  args: {
    isDarkMode: false,
    onToggle: () => {},
  },
}

export const DarkMode: Story = {
  args: {
    isDarkMode: true,
    onToggle: () => {},
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    return (
      <div
        style={{
          padding: '40px',
          backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
        }}
      >
        <ThemeToggleBase
          {...args}
          isDarkMode={isDarkMode}
          onToggle={() => {
            setIsDarkMode(!isDarkMode)
            args.onToggle()
          }}
        />
        <p style={{ marginTop: '16px' }}>Current mode: {isDarkMode ? 'Dark' : 'Light'}</p>
      </div>
    )
  },
  args: {
    isDarkMode: false,
    onToggle: () => {},
  },
}
