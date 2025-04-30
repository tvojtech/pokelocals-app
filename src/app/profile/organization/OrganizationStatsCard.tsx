import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export function OrganizationStatsCard() {
  const chartData = [
    { month: 'January', tournaments: 186, players: 100 },
    { month: 'February', tournaments: 305, players: 200 },
    { month: 'March', tournaments: 237, players: 300 },
    { month: 'April', tournaments: 73, players: 400 },
    { month: 'May', tournaments: 209, players: 500 },
    { month: 'June', tournaments: 214, players: 600 },
  ];
  const chartConfig = {
    tournaments: {
      label: 'Tournaments',
      color: 'hsl(var(--chart-1))',
    },
    players: {
      label: 'Players',
      color: 'hsl(var(--chart-5))',
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization stats</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}>
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <XAxis dataKey="players" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="tournaments" layout="vertical" fill="var(--color-tournaments)" radius={4}>
              <LabelList
                dataKey="tournaments"
                position="insideRight"
                offset={8}
                className="fill-background"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="players" layout="vertical" fill="var(--color-players)" radius={4}>
              <LabelList
                dataKey="players"
                position="insideRight"
                offset={8}
                className="fill-background"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
