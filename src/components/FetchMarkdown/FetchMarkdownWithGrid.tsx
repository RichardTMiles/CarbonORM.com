import FetchMarkdown, {iFetchMarkdown} from "components/FetchMarkdown/FetchMarkdown";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";


export default function FetchMarkdownWithGrid({url}: iFetchMarkdown) {
    return <GridContainer justify="center">
        <GridItem sm={0} md={2}/>
        <GridItem mdOffset={2} sm={12} md={8}>
            <FetchMarkdown url={url}/>
        </GridItem>
        <GridItem sm={0} md={2}/>
    </GridContainer>
}