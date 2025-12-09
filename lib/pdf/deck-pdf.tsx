import React from 'react';
import { Document, View, Text } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, fontSize, spacing } from './pdf-styles';
import {
  Slide,
  Title,
  Heading,
  BulletList,
  Card,
  TwoColumn,
  BorderedSection,
  IconUsers,
  IconShield,
  IconBot,
  IconBox,
  TeamMember,
} from './pdf-components';
import {
  EconomicsChart,
  ScalingDiagram,
  RoadmapTimeline,
  AgentWorkflowDiagram,
} from './pdf-charts';
import {
  DirectorOSOverview,
} from './pdf-mockups';
import { getDeckContent, DeckContent, SlideContent } from '@/lib/deck-content';

const localStyles = StyleSheet.create({
  coverCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverTitle: {
    fontFamily: fonts.heading,
    fontSize: 56,
    color: colors.white,
    marginBottom: spacing.md,
  },
  coverTagline: {
    fontFamily: fonts.body,
    fontSize: fontSize.subtitle,
    color: colors.gray[300],
    textAlign: 'center',
    maxWidth: 700,
    lineHeight: 1.4,
  },
  coverSubtagline: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    color: colors.gray[400],
    textAlign: 'center',
    marginTop: spacing.md,
  },
  coverUrl: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    color: colors.gray[500],
    marginTop: spacing.xxl,
  },
  contentArea: {
    flex: 1,
  },
  highlightBox: {
    backgroundColor: colors.gray[800],
    padding: spacing.md,
    borderRadius: 6,
    marginTop: spacing.md,
  },
  highlightText: {
    fontFamily: fonts.heading,
    fontSize: fontSize.body,
    color: colors.white,
    textAlign: 'center',
  },
  askBox: {
    backgroundColor: colors.gray[800],
    borderWidth: 2,
    borderColor: colors.white,
    padding: spacing.lg,
    borderRadius: 6,
    marginTop: spacing.md,
  },
  askTitle: {
    fontFamily: fonts.heading,
    fontSize: fontSize.heading,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  askAmount: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    fontFamily: fonts.body,
    fontSize: fontSize.tiny,
    color: colors.gray[500],
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  bodyText: {
    fontFamily: fonts.body,
    fontSize: fontSize.body,
    color: colors.gray[300],
    lineHeight: 1.4,
    marginBottom: spacing.sm,
  },
  boldText: {
    fontFamily: fonts.heading,
    fontSize: fontSize.body,
    color: colors.white,
  },
  smallCard: {
    backgroundColor: colors.gray[800],
    borderRadius: 4,
    padding: spacing.sm,
    marginBottom: spacing.xs,
  },
  cardLabel: {
    fontFamily: fonts.body,
    fontSize: fontSize.tiny,
    color: colors.gray[400],
    marginBottom: 2,
  },
  cardValue: {
    fontFamily: fonts.heading,
    fontSize: fontSize.body,
    color: colors.white,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.sm,
  },
  teamGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  column: {
    flex: 1,
  },
});

// Helper to render sections with items or text
function renderSections(sections: SlideContent['sections'], limit?: number) {
  const items = limit ? sections?.slice(0, limit) : sections;
  return items?.map((section, i) => (
    <View key={i} style={{ marginBottom: spacing.sm }}>
      {section.heading && <Heading level={3}>{section.heading}</Heading>}
      {section.text && <Text style={localStyles.bodyText}>{section.text}</Text>}
      {section.items && <BulletList items={section.items} />}
    </View>
  ));
}

// Slide 1: Cover
function CoverSlide({ content }: { content: DeckContent }) {
  return (
    <Slide variant="dark" pageNumber={1}>
      <View style={localStyles.coverCenter}>
        <Text style={localStyles.coverTitle}>{content.cover.title}</Text>
        <Text style={localStyles.coverTagline}>{content.cover.tagline}</Text>
        <Text style={localStyles.coverSubtagline}>{content.cover.subtagline}</Text>
        <Text style={localStyles.coverUrl}>{content.cover.url}</Text>
      </View>
    </Slide>
  );
}

// Generic content slide
function ContentSlide({ slide, pageNumber, variant = 'dark' }: { slide: SlideContent; pageNumber: number; variant?: 'dark' | 'light' }) {
  return (
    <Slide variant={variant} pageNumber={pageNumber}>
      <Title subtitle={slide.subtitle}>{slide.title}</Title>
      <View style={localStyles.contentArea}>
        {renderSections(slide.sections)}
        {slide.footnote && <Text style={localStyles.bodyText}>{slide.footnote}</Text>}
        {slide.highlight && (
          <View style={localStyles.highlightBox}>
            <Text style={localStyles.highlightText}>{slide.highlight}</Text>
          </View>
        )}
      </View>
    </Slide>
  );
}

// Two column slide
function TwoColumnSlide({ slide, pageNumber, variant = 'dark' }: { slide: SlideContent; pageNumber: number; variant?: 'dark' | 'light' }) {
  const leftSections = slide.sections?.slice(0, Math.ceil((slide.sections?.length || 0) / 2));
  const rightSections = slide.sections?.slice(Math.ceil((slide.sections?.length || 0) / 2));
  
  return (
    <Slide variant={variant} pageNumber={pageNumber}>
      <Title subtitle={slide.subtitle}>{slide.title}</Title>
      <TwoColumn
        left={<View>{renderSections(leftSections)}</View>}
        right={<View>{renderSections(rightSections)}</View>}
      />
      {slide.footnote && <Text style={localStyles.bodyText}>{slide.footnote}</Text>}
      {slide.highlight && (
        <View style={localStyles.highlightBox}>
          <Text style={localStyles.highlightText}>{slide.highlight}</Text>
        </View>
      )}
    </Slide>
  );
}

// Director What We Are slide with icons
function DirectorWhatWeAreSlide({ slide, pageNumber }: { slide: SlideContent; pageNumber: number }) {
  return (
    <Slide variant="light" pageNumber={pageNumber}>
      <Title subtitle={slide.subtitle}>{slide.title}</Title>
      <TwoColumn
        left={
          <Card variant="bordered">
            <View style={localStyles.iconRow}>
              <IconBox icon={<IconShield size={20} />} />
              <Heading level={3}>{slide.sections?.[0]?.heading}</Heading>
            </View>
            {slide.sections?.[0]?.items && <BulletList items={slide.sections[0].items} />}
          </Card>
        }
        right={
          <Card variant="bordered">
            <View style={localStyles.iconRow}>
              <IconBox icon={<IconUsers size={20} />} />
              <Heading level={3}>{slide.sections?.[1]?.heading}</Heading>
            </View>
            {slide.sections?.[1]?.items && <BulletList items={slide.sections[1].items} />}
          </Card>
        }
      />
      {slide.highlight && (
        <View style={localStyles.highlightBox}>
          <Text style={localStyles.highlightText}>{slide.highlight}</Text>
        </View>
      )}
    </Slide>
  );
}

// Director Pod slide with scaling diagram
function DirectorPodSlide({ slide, pageNumber }: { slide: SlideContent; pageNumber: number }) {
  return (
    <Slide variant="light" pageNumber={pageNumber}>
      <Title subtitle={slide.subtitle}>{slide.title}</Title>
      <ScalingDiagram />
      <View style={{ ...localStyles.row, marginTop: spacing.sm }}>
        {slide.sections?.map((section, i) => (
          <Card key={i} variant="bordered" style={localStyles.column}>
            <Heading level={3}>{section.heading}</Heading>
            {section.items && <BulletList items={section.items} />}
            {section.text && <Text style={localStyles.bodyText}>{section.text}</Text>}
          </Card>
        ))}
      </View>
    </Slide>
  );
}

// Director OS slide with mockups
function DirectorOSSlide({ slide, pageNumber }: { slide: SlideContent; pageNumber: number }) {
  return (
    <Slide variant="dark" pageNumber={pageNumber}>
      <Title subtitle={slide.subtitle}>{slide.title}</Title>
      <DirectorOSOverview />
      <View style={{ ...localStyles.row, marginTop: spacing.sm, flexWrap: 'wrap' }}>
        {slide.sections?.map((section, i) => (
          <View key={i} style={{ ...localStyles.smallCard, width: '48%' }}>
            <Text style={localStyles.cardValue}>{section.heading}</Text>
            <Text style={localStyles.cardLabel}>{section.text}</Text>
          </View>
        ))}
      </View>
    </Slide>
  );
}

// AI Agents slide with workflow
function AIAgentsSlide({ slide, pageNumber }: { slide: SlideContent; pageNumber: number }) {
  return (
    <Slide variant="light" pageNumber={pageNumber}>
      <Title subtitle={slide.subtitle}>{slide.title}</Title>
      <View style={{ ...localStyles.row, flexWrap: 'wrap' }}>
        {slide.sections?.map((section, i) => (
          <Card key={i} variant="bordered" style={{ width: '48%', marginBottom: spacing.xs }}>
            <View style={localStyles.iconRow}>
              <IconBot size={16} />
              <Text style={localStyles.boldText}>{section.heading}</Text>
            </View>
            {section.items && <BulletList items={section.items} />}
          </Card>
        ))}
      </View>
      <AgentWorkflowDiagram />
    </Slide>
  );
}

// Economics slide with chart
function EconomicsSlide({ slide, pageNumber }: { slide: SlideContent; pageNumber: number }) {
  return (
    <Slide variant="dark" pageNumber={pageNumber}>
      <Title subtitle={slide.subtitle}>{slide.title}</Title>
      <EconomicsChart />
      {slide.footnote && <Text style={localStyles.bodyText}>{slide.footnote}</Text>}
    </Slide>
  );
}

// Team slide with members
function TeamSlide({ slide, pageNumber }: { slide: SlideContent; pageNumber: number }) {
  return (
    <Slide variant="dark" pageNumber={pageNumber}>
      <Title subtitle={slide.subtitle}>{slide.title}</Title>
      <View style={localStyles.teamGrid}>
        {slide.sections?.map((section, i) => (
          <TeamMember 
            key={i} 
            name={section.heading || ''} 
            role={section.text || ''} 
          />
        ))}
      </View>
      {slide.footnote && (
        <Card variant="bordered" style={{ marginTop: spacing.md }}>
          <Text style={localStyles.bodyText}>{slide.footnote}</Text>
        </Card>
      )}
    </Slide>
  );
}

// Roadmap slide with timeline and ask
function RoadmapSlide({ slide, ask, pageNumber }: { slide: SlideContent; ask: DeckContent['ask']; pageNumber: number }) {
  return (
    <Slide variant="light" pageNumber={pageNumber}>
      <Title>{slide.title}</Title>
      <RoadmapTimeline />
      <View style={localStyles.askBox}>
        <Text style={localStyles.askTitle}>Ask</Text>
        <Text style={localStyles.askAmount}>{ask.amount}</Text>
        <BulletList items={ask.items} color={colors.white} />
      </View>
    </Slide>
  );
}

// Main Document
export function DirectorPitchDeck() {
  const content = getDeckContent();
  
  // Helper to get slide by ID
  const getSlide = (id: string) => content.slides.find(s => s.id === id);
  
  return (
    <Document
      title="Director Pitch Deck"
      author="Director"
      subject="AI-native backbone for nonprofits"
      keywords="director, nonprofit, AI, operations, fundraising"
    >
      {/* 1. Cover */}
      <CoverSlide content={content} />
      
      {/* 2. Problem - Founders */}
      {getSlide('problem-founders') && (
        <ContentSlide slide={getSlide('problem-founders')!} pageNumber={2} />
      )}
      
      {/* 3. Problem - Downshifted */}
      {getSlide('problem-downshifted') && (
        <TwoColumnSlide slide={getSlide('problem-downshifted')!} pageNumber={3} variant="light" />
      )}
      
      {/* 4. Foundations as Buyers */}
      {getSlide('customer-foundations') && (
        <TwoColumnSlide slide={getSlide('customer-foundations')!} pageNumber={4} variant="dark" />
      )}
      
      {/* 5. Broken Options */}
      {getSlide('broken-options') && (
        <ContentSlide slide={getSlide('broken-options')!} pageNumber={5} />
      )}
      
      {/* 6. What We Are */}
      {getSlide('what-we-are') && (
        <DirectorWhatWeAreSlide slide={getSlide('what-we-are')!} pageNumber={6} />
      )}
      
      {/* 7. Fundraising Philosophy */}
      {getSlide('fundraising-philosophy') && (
        <TwoColumnSlide slide={getSlide('fundraising-philosophy')!} pageNumber={7} />
      )}
      
      {/* 8. Director Pod */}
      {getSlide('director-pod') && (
        <DirectorPodSlide slide={getSlide('director-pod')!} pageNumber={8} />
      )}
      
      {/* 9. Director OS */}
      {getSlide('director-os') && (
        <DirectorOSSlide slide={getSlide('director-os')!} pageNumber={9} />
      )}
      
      {/* 10. AI Agents */}
      {getSlide('ai-agents') && (
        <AIAgentsSlide slide={getSlide('ai-agents')!} pageNumber={10} />
      )}
      
      {/* 11. Economics */}
      {getSlide('economics') && (
        <EconomicsSlide slide={getSlide('economics')!} pageNumber={11} />
      )}
      
      {/* 12. Why Now */}
      {getSlide('why-now') && (
        <TwoColumnSlide slide={getSlide('why-now')!} pageNumber={12} variant="light" />
      )}
      
      {/* 13. Go-to-Market */}
      {getSlide('go-to-market') && (
        <ContentSlide slide={getSlide('go-to-market')!} pageNumber={13} />
      )}
      
      {/* 14. Business Model */}
      {getSlide('business-model') && (
        <ContentSlide slide={getSlide('business-model')!} pageNumber={14} variant="light" />
      )}
      
      {/* 15. Team */}
      {getSlide('team') && (
        <TeamSlide slide={getSlide('team')!} pageNumber={15} />
      )}
      
      {/* 16. Current Customers & Traction */}
      {getSlide('current-customers') && (
        <ContentSlide slide={getSlide('current-customers')!} pageNumber={16} variant="light" />
      )}
      
      {/* 17. Roadmap & Ask */}
      {getSlide('roadmap') && (
        <RoadmapSlide slide={getSlide('roadmap')!} ask={content.ask} pageNumber={17} />
      )}
    </Document>
  );
}

export default DirectorPitchDeck;
