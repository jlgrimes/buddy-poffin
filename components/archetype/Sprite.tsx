import { cn } from "@/lib/utils";

interface SpriteProps {
  name: string | null | undefined;
  faded?: boolean;
}

export const Sprite = (props: SpriteProps) => {
  if (!props.name) return null;

  return (
    <img src={`https://limitlesstcg.s3.us-east-2.amazonaws.com/pokemon/gen9/${props.name}.png`} height={30} width={'auto'} alt={props.name} className={cn(
      'pixel-image',
      props.faded && 'opacity-40', 'h-[40px] w-[40px] object-contain'
    )} />
  )
}