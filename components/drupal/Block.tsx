import { blocksMap } from "@/params/blocks";
import { Block as DefaultBlock } from "@/components/blocks/Block";
import { RelatedByBadgeBlock } from "@/components/blocks/RelatedByBadgeBlock";
import { BadgesBlock } from "@/components/blocks/BadgesBlock";
import { PremiumOrganizationsBlock } from "@/components/blocks/PremiumOrganizationsBlock";
import { CountriesBlock } from "@/components/blocks/CountriesBlock";

interface BlockProps {
  block: any;
}

const componentsMap: Record<string, React.ComponentType<BlockProps>> = {
  RelatedByBadgeBlock,
  BadgesBlock,
  PremiumOrganizationsBlock,
  CountriesBlock,
};

export function Block({ block }: BlockProps) {
  const options = blocksMap(block.block_id);
  const component = options?.component;

  const Component = component && componentsMap[component];

  return Component ? <Component block={block} /> : <DefaultBlock block={block} />;
}
