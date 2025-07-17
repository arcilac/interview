import type { Meta, StoryObj } from '@storybook/react'
import { CountryCard } from '../CountryCard'
import { mockCountries } from '../../../../.storybook/mockData/countries'

const meta = {
  title: 'Molecules/CountryCard',
  component: CountryCard,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CountryCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    country: mockCountries[0], // United States
  },
}

export const WithLongName: Story = {
  args: {
    country: {
      ...mockCountries[1],
      name: {
        common: 'The Former Yugoslav Republic of Macedonia',
        official: 'The Former Yugoslav Republic of Macedonia',
      },
    },
  },
}

export const NoFlag: Story = {
  args: {
    country: {
      ...mockCountries[2],
      flags: {
        png: '',
        svg: '',
      },
    },
  },
}

export const NoCapital: Story = {
  args: {
    country: {
      ...mockCountries[0],
      capital: undefined,
    },
  },
}

export const Grid: Story = {
  args: {
    country: mockCountries[0], // Required by TypeScript, but not used in render
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        width: '100%',
        maxWidth: '1200px',
      }}
    >
      {mockCountries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  ),
}
