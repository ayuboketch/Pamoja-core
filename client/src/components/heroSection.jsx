import { Button } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";

type ImageProps = {
    src: string;
    alt?: string;
  };
  
  type Props = {
    heading: string;
    description: string;
    buttons: ButtonProps[];
    image: ImageProps;
  };

export default heroSection = () => {
    return (
        <div>
            <h1>Hero Section</h1>
        </div>
    )
}; 