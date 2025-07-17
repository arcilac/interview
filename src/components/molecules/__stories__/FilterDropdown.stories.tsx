import type { Meta, StoryObj } from '@storybook/react'
import { FilterDropdown } from '../FilterDropdown'
import { useState } from 'react'
import { type Region } from '../../../types/country'

const meta = {
  title: 'Molecules/FilterDropdown',
  component: FilterDropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // NOTE: Controls for props in Storybook UI
  argTypes: {
    value: {
      control: 'select',
      options: [null, 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
      description: 'Currently selected region',
    },
    onChange: {
      action: 'change',
      description: 'Callback function called when region selection changes',
    },
  },
} satisfies Meta<typeof FilterDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: null,
    onChange: () => {},
  },
}

export const WithSelection: Story = {
  args: {
    value: 'Europe',
    onChange: () => {},
  },
}

export const Interactive: Story = {
  render: (args) => {
    const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)

    return (
      <div style={{ height: '300px', display: 'flex', alignItems: 'flex-start' }}>
        <FilterDropdown
          {...args}
          value={selectedRegion}
          onChange={(region) => {
            setSelectedRegion(region)
            args.onChange(region)
          }}
        />
        <p style={{ marginLeft: '24px', color: '#666' }}>Selected: {selectedRegion || 'None'}</p>
      </div>
    )
  },
  args: {
    value: null,
    onChange: () => {},
  },
}
