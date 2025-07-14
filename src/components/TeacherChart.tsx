import { ResponsiveBar } from '@nivo/bar';

type ChartProps = {
  data: {
    course: string;
    students: number;
  }[];
};

const TeacherChart = ({ data }: ChartProps) => {
  return (
    <div className='chart'>
            <h2 style={{ textAlign: "center", marginBottom: 30 }}>Course Preview</h2>

      <ResponsiveBar
                data={data}
        keys={["students"]}
        indexBy="course"
        padding={0.5}
                margin={{ top: 50, bottom: 100, left:90}}
        colors={{ scheme: "category10" }}
        axisBottom={{
          tickRotation: -30,
          legend: "Courses",
          legendPosition: "middle",
          legendOffset: 60,
        }}
        axisLeft={{
          legend: "Students Enrolled",
          legendPosition: "middle",
          legendOffset: -60,
        }}
        enableLabel={false}
        animate={true}
      />
    </div>
  );
};

export default TeacherChart;


