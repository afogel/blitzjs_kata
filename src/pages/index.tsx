import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Grid, Col, Card, Text, Metric } from "@tremor/react"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-2 h-full">
        <Col numColSpan={1} numColSpanLg={2}>
          <Card>
            <Text>Title</Text>
            <Metric>KPI 1</Metric>
          </Card>
        </Col>
        <Card>
          <Text>Title</Text>
          <Metric>KPI 2</Metric>
        </Card>
        <Col>
          <Card>
            <Text>Title</Text>
            <Metric>KPI 3</Metric>
          </Card>
        </Col>
        <Card>
          <Text>Title</Text>
          <Metric>KPI 4</Metric>
        </Card>
        <Card>
          <Text>Title</Text>
          <Metric>KPI 5</Metric>
        </Card>
      </Grid>
    </Layout>
  )
}

export default Home
