import { ChartAreaInteractive } from "./_components/chart-area-interactive";
import { DataTable } from "./_components/data-table";
import data from "./_components/data.json";
import { SectionCards } from "./_components/section-cards";

export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Restaurant Overview</h1>
        <p className="text-muted-foreground">
          Monitor daily operations, track inventory levels, and analyze revenue performance
        </p>
      </div>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={data} />
    </div>
  );
}
