interface Props {
  params: {
    id: string;
  };
}

export default function MediaFilePage({ params }: Props) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Media File</h1>
      <p className="text-sm text-muted-foreground">Media id: {params.id}</p>
    </div>
  );
}