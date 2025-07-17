import type { Meta, StoryObj } from '@storybook/react'
import { Search } from '../Search'
import { useState } from 'react'

const meta = {
  title: 'Molecules/Search',
  component: Search,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // NOTE: Controls for props in Storybook UI
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    defaultValue: {
      control: 'text',
      description: 'Initial value for the search input',
    },
    onSearch: {
      action: 'search',
      description: 'Callback function called when search value changes (debounced)',
    },
  },
} satisfies Meta<typeof Search>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Search for a country...',
    onSearch: () => {},
  },
}

export const WithDefaultValue: Story = {
  args: {
    placeholder: 'Search for a country...',
    defaultValue: 'United',
    onSearch: () => {},
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Type country name here...',
    onSearch: () => {},
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState('')

    return (
      <div style={{ width: '400px' }}>
        <Search
          {...args}
          onSearch={(value) => {
            setSearchValue(value)
            args.onSearch(value)
          }}
        />
        <p style={{ marginTop: '16px', color: '#666' }}>Search value: "{searchValue}"</p>
      </div>
    )
  },
  args: {
    placeholder: 'Search for a country...',
    onSearch: () => {},
  },
}
