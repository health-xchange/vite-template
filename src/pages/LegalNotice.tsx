import { useState } from 'react';
import { Container, Grid, GridCol, TypographyStylesProvider } from '@mantine/core';
import { terms_conditions_text, privacy_policy } from '@/utils/terms-conditions';
import { TableOfContentsFloating } from '@/components/TableOfContents/TableOfContents';
import { TocOptions } from '@/interfaces/common';

const tocLinks: TocOptions[] = [
    { label: 'Privacy Policy', link: '#privacy-policy', order: 1, content: privacy_policy },
    { label: 'Terms and Conditions', link: '#terms-conditions', order: 1, content: terms_conditions_text },
];

const LegalNotice: React.FC<{}> = () => {
    const [activeTab, setActiveTab] = useState(0);
    const activeContent = tocLinks[activeTab].content;

    return (
        <Container size="md">
            <Grid>
                <GridCol span={{ xs: 12, md: 3 }}>
                    <div style={{ position: 'sticky', top: 56 }}>
                        <TableOfContentsFloating activeIdx={activeTab} options={tocLinks} setActiveIdx={setActiveTab} />
                    </div>
                </GridCol>
                <GridCol span={{ xs: 12, md: 9 }}>
                    <TypographyStylesProvider>
                        <div dangerouslySetInnerHTML={{ __html: activeContent }} />
                    </TypographyStylesProvider>
                </GridCol>
            </Grid>
        </Container>
    );
};

export default LegalNotice;
