import { StandardCard, StandardCardProps } from '../../components/cards/StandardCard';
import useComponentConfig from '../utils/useComponentConfig';

export default function ConfiguredStandardCard(props: StandardCardProps) {
  const cardConfig = useComponentConfig('standardCard');
  const updatedProps = {
    ...props,
    config: {
      ...cardConfig
    }
  }

  return <StandardCard {...updatedProps} />
}