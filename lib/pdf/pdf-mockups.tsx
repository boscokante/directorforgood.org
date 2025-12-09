import React from 'react';
import { View, Text, Svg, Rect, Line, Circle, Path } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, fontSize, spacing } from './pdf-styles';

// Director OS Dashboard Mockup
export function DashboardMockup() {
  const mockupStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray[900],
      borderRadius: 8,
      padding: 2,
      borderWidth: 1,
      borderColor: colors.gray[700],
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: colors.gray[800],
    },
    dots: {
      flexDirection: 'row',
      gap: 4,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
    title: {
      fontFamily: fonts.heading,
      fontSize: 10,
      color: colors.white,
      marginLeft: spacing.md,
    },
    content: {
      padding: spacing.sm,
      flexDirection: 'row',
      gap: spacing.sm,
    },
    sidebar: {
      width: 60,
      backgroundColor: colors.gray[800],
      borderRadius: 4,
      padding: spacing.xs,
    },
    sidebarItem: {
      height: 8,
      backgroundColor: colors.gray[600],
      borderRadius: 2,
      marginBottom: 4,
    },
    sidebarItemActive: {
      height: 8,
      backgroundColor: colors.white,
      borderRadius: 2,
      marginBottom: 4,
    },
    main: {
      flex: 1,
    },
    card: {
      backgroundColor: colors.gray[800],
      borderRadius: 4,
      padding: spacing.xs,
      marginBottom: spacing.xs,
    },
    cardTitle: {
      fontFamily: fonts.body,
      fontSize: 8,
      color: colors.gray[400],
      marginBottom: 4,
    },
    cardContent: {
      height: 20,
      backgroundColor: colors.gray[700],
      borderRadius: 2,
    },
    grid: {
      flexDirection: 'row',
      gap: spacing.xs,
    },
    gridItem: {
      flex: 1,
    },
  });

  return (
    <View style={mockupStyles.container}>
      {/* Window header */}
      <View style={mockupStyles.header}>
        <View style={mockupStyles.dots}>
          <View style={{ ...mockupStyles.dot, backgroundColor: '#FF5F56' }} />
          <View style={{ ...mockupStyles.dot, backgroundColor: '#FFBD2E' }} />
          <View style={{ ...mockupStyles.dot, backgroundColor: '#27CA40' }} />
        </View>
        <Text style={mockupStyles.title}>Director OS</Text>
      </View>
      
      {/* Content */}
      <View style={mockupStyles.content}>
        {/* Sidebar */}
        <View style={mockupStyles.sidebar}>
          <View style={mockupStyles.sidebarItemActive} />
          <View style={mockupStyles.sidebarItem} />
          <View style={mockupStyles.sidebarItem} />
          <View style={mockupStyles.sidebarItem} />
        </View>
        
        {/* Main content */}
        <View style={mockupStyles.main}>
          <View style={mockupStyles.grid}>
            <View style={mockupStyles.gridItem}>
              <View style={mockupStyles.card}>
                <Text style={mockupStyles.cardTitle}>Revenue</Text>
                <View style={mockupStyles.cardContent} />
              </View>
            </View>
            <View style={mockupStyles.gridItem}>
              <View style={mockupStyles.card}>
                <Text style={mockupStyles.cardTitle}>Runway</Text>
                <View style={mockupStyles.cardContent} />
              </View>
            </View>
          </View>
          <View style={mockupStyles.card}>
            <Text style={mockupStyles.cardTitle}>Pipeline</Text>
            <View style={{ ...mockupStyles.cardContent, height: 30 }} />
          </View>
        </View>
      </View>
    </View>
  );
}

// Revenue & Relationships View
export function RevenueRelationshipsMockup() {
  const mockupStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray[900],
      borderRadius: 6,
      padding: spacing.sm,
      borderWidth: 1,
      borderColor: colors.gray[700],
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    title: {
      fontFamily: fonts.heading,
      fontSize: 10,
      color: colors.white,
    },
    badge: {
      backgroundColor: colors.gray[700],
      paddingHorizontal: 4,
      paddingVertical: 1,
      borderRadius: 3,
    },
    badgeText: {
      fontFamily: fonts.body,
      fontSize: 7,
      color: colors.gray[300],
    },
    section: {
      marginBottom: spacing.xs,
    },
    sectionTitle: {
      fontFamily: fonts.body,
      fontSize: 7,
      color: colors.gray[400],
      marginBottom: 2,
    },
    pipeline: {
      flexDirection: 'row',
      gap: 2,
    },
    stage: {
      flex: 1,
      backgroundColor: colors.gray[800],
      borderRadius: 3,
      padding: 3,
      alignItems: 'center',
    },
    stageCount: {
      fontFamily: fonts.heading,
      fontSize: 10,
      color: colors.white,
    },
    stageLabel: {
      fontFamily: fonts.body,
      fontSize: 6,
      color: colors.gray[400],
    },
    contactRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.gray[800],
      borderRadius: 3,
      padding: 3,
      marginBottom: 2,
    },
    avatar: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.gray[600],
      marginRight: 3,
    },
    contactInfo: {
      flex: 1,
    },
    contactName: {
      fontFamily: fonts.body,
      fontSize: 7,
      color: colors.white,
    },
    contactOrg: {
      fontFamily: fonts.body,
      fontSize: 6,
      color: colors.gray[400],
    },
    action: {
      backgroundColor: colors.white,
      paddingHorizontal: 4,
      paddingVertical: 1,
      borderRadius: 2,
    },
    actionText: {
      fontFamily: fonts.body,
      fontSize: 6,
      color: colors.black,
    },
  });

  return (
    <View style={mockupStyles.container}>
      <View style={mockupStyles.header}>
        <Text style={mockupStyles.title}>Revenue & Relationships</Text>
        <View style={mockupStyles.badge}>
          <Text style={mockupStyles.badgeText}>Q4 2024</Text>
        </View>
      </View>
      
      {/* Pipeline */}
      <View style={mockupStyles.section}>
        <Text style={mockupStyles.sectionTitle}>MAJOR GIFTS PIPELINE</Text>
        <View style={mockupStyles.pipeline}>
          <View style={mockupStyles.stage}>
            <Text style={mockupStyles.stageCount}>12</Text>
            <Text style={mockupStyles.stageLabel}>Prospects</Text>
          </View>
          <View style={mockupStyles.stage}>
            <Text style={mockupStyles.stageCount}>8</Text>
            <Text style={mockupStyles.stageLabel}>Cultivating</Text>
          </View>
          <View style={mockupStyles.stage}>
            <Text style={mockupStyles.stageCount}>4</Text>
            <Text style={mockupStyles.stageLabel}>Solicitation</Text>
          </View>
          <View style={{ ...mockupStyles.stage, backgroundColor: colors.gray[700] }}>
            <Text style={mockupStyles.stageCount}>2</Text>
            <Text style={mockupStyles.stageLabel}>Closed</Text>
          </View>
        </View>
      </View>
      
      {/* Next Actions */}
      <View style={mockupStyles.section}>
        <Text style={mockupStyles.sectionTitle}>NEXT BEST ACTIONS</Text>
        <View style={mockupStyles.contactRow}>
          <View style={mockupStyles.avatar} />
          <View style={mockupStyles.contactInfo}>
            <Text style={mockupStyles.contactName}>Sarah Chen</Text>
            <Text style={mockupStyles.contactOrg}>Chen Foundation</Text>
          </View>
          <View style={mockupStyles.action}>
            <Text style={mockupStyles.actionText}>Follow up</Text>
          </View>
        </View>
        <View style={mockupStyles.contactRow}>
          <View style={mockupStyles.avatar} />
          <View style={mockupStyles.contactInfo}>
            <Text style={mockupStyles.contactName}>Marcus Johnson</Text>
            <Text style={mockupStyles.contactOrg}>Community Fund</Text>
          </View>
          <View style={mockupStyles.action}>
            <Text style={mockupStyles.actionText}>Schedule</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// Runway & Finance View
export function RunwayFinanceMockup() {
  const mockupStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray[900],
      borderRadius: 6,
      padding: spacing.sm,
      borderWidth: 1,
      borderColor: colors.gray[700],
    },
    header: {
      marginBottom: spacing.sm,
    },
    title: {
      fontFamily: fonts.heading,
      fontSize: 10,
      color: colors.white,
    },
    metrics: {
      flexDirection: 'row',
      gap: spacing.xs,
      marginBottom: spacing.sm,
    },
    metric: {
      flex: 1,
      backgroundColor: colors.gray[800],
      borderRadius: 3,
      padding: spacing.xs,
    },
    metricValue: {
      fontFamily: fonts.heading,
      fontSize: 12,
      color: colors.white,
    },
    metricLabel: {
      fontFamily: fonts.body,
      fontSize: 6,
      color: colors.gray[400],
    },
    metricGood: {
      color: '#4ADE80',
    },
    metricWarning: {
      color: '#FBBF24',
    },
    chart: {
      backgroundColor: colors.gray[800],
      borderRadius: 3,
      padding: spacing.xs,
      height: 40,
    },
    chartTitle: {
      fontFamily: fonts.body,
      fontSize: 6,
      color: colors.gray[400],
      marginBottom: 2,
    },
    chartBars: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: 28,
      gap: 1,
    },
    chartBar: {
      flex: 1,
      backgroundColor: colors.gray[600],
      borderRadius: 1,
    },
  });

  return (
    <View style={mockupStyles.container}>
      <View style={mockupStyles.header}>
        <Text style={mockupStyles.title}>Runway & Finance</Text>
      </View>
      
      {/* Metrics */}
      <View style={mockupStyles.metrics}>
        <View style={mockupStyles.metric}>
          <Text style={{ ...mockupStyles.metricValue, ...mockupStyles.metricGood }}>8.2</Text>
          <Text style={mockupStyles.metricLabel}>Months Runway</Text>
        </View>
        <View style={mockupStyles.metric}>
          <Text style={mockupStyles.metricValue}>$42k</Text>
          <Text style={mockupStyles.metricLabel}>Monthly Burn</Text>
        </View>
        <View style={mockupStyles.metric}>
          <Text style={{ ...mockupStyles.metricValue, ...mockupStyles.metricWarning }}>87%</Text>
          <Text style={mockupStyles.metricLabel}>Budget Used</Text>
        </View>
      </View>
      
      {/* Chart */}
      <View style={mockupStyles.chart}>
        <Text style={mockupStyles.chartTitle}>CASH FORECAST (12 MONTHS)</Text>
        <View style={mockupStyles.chartBars}>
          {[80, 75, 70, 65, 60, 55, 50, 55, 60, 70, 75, 80].map((h, i) => (
            <View key={i} style={{ ...mockupStyles.chartBar, height: `${h}%` }} />
          ))}
        </View>
      </View>
    </View>
  );
}

// Board Reporting View
export function BoardReportingMockup() {
  const mockupStyles = StyleSheet.create({
    container: {
      backgroundColor: colors.gray[900],
      borderRadius: 8,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.gray[700],
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    title: {
      fontFamily: fonts.heading,
      fontSize: 12,
      color: colors.white,
    },
    status: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#4ADE80',
      marginRight: 4,
    },
    statusText: {
      fontFamily: fonts.body,
      fontSize: 8,
      color: '#4ADE80',
    },
    documents: {
      gap: spacing.xs,
    },
    document: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.gray[800],
      borderRadius: 4,
      padding: spacing.xs,
    },
    docIcon: {
      width: 24,
      height: 24,
      backgroundColor: colors.gray[700],
      borderRadius: 4,
      marginRight: spacing.xs,
      alignItems: 'center',
      justifyContent: 'center',
    },
    docIconText: {
      fontFamily: fonts.body,
      fontSize: 8,
      color: colors.gray[400],
    },
    docInfo: {
      flex: 1,
    },
    docName: {
      fontFamily: fonts.body,
      fontSize: 9,
      color: colors.white,
    },
    docMeta: {
      fontFamily: fonts.body,
      fontSize: 7,
      color: colors.gray[400],
    },
    docStatus: {
      fontFamily: fonts.body,
      fontSize: 7,
      color: colors.gray[400],
    },
  });

  return (
    <View style={mockupStyles.container}>
      <View style={mockupStyles.header}>
        <Text style={mockupStyles.title}>Narratives & Reporting</Text>
        <View style={mockupStyles.status}>
          <View style={mockupStyles.statusDot} />
          <Text style={mockupStyles.statusText}>Board-ready</Text>
        </View>
      </View>
      
      <View style={mockupStyles.documents}>
        <View style={mockupStyles.document}>
          <View style={mockupStyles.docIcon}>
            <Text style={mockupStyles.docIconText}>PDF</Text>
          </View>
          <View style={mockupStyles.docInfo}>
            <Text style={mockupStyles.docName}>Q4 Board Deck</Text>
            <Text style={mockupStyles.docMeta}>Auto-updated 2 hours ago</Text>
          </View>
          <Text style={mockupStyles.docStatus}>Ready</Text>
        </View>
        
        <View style={mockupStyles.document}>
          <View style={mockupStyles.docIcon}>
            <Text style={mockupStyles.docIconText}>DOC</Text>
          </View>
          <View style={mockupStyles.docInfo}>
            <Text style={mockupStyles.docName}>Funder Impact Report</Text>
            <Text style={mockupStyles.docMeta}>Chen Foundation</Text>
          </View>
          <Text style={mockupStyles.docStatus}>Draft</Text>
        </View>
        
        <View style={mockupStyles.document}>
          <View style={mockupStyles.docIcon}>
            <Text style={mockupStyles.docIconText}>XLS</Text>
          </View>
          <View style={mockupStyles.docInfo}>
            <Text style={mockupStyles.docName}>Financial Summary</Text>
            <Text style={mockupStyles.docMeta}>YTD 2024</Text>
          </View>
          <Text style={mockupStyles.docStatus}>Ready</Text>
        </View>
      </View>
    </View>
  );
}

// Four-panel OS overview
export function DirectorOSOverview() {
  const overviewStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    panel: {
      width: '48%',
    },
  });

  return (
    <View style={overviewStyles.container}>
      <View style={overviewStyles.panel}>
        <RevenueRelationshipsMockup />
      </View>
      <View style={overviewStyles.panel}>
        <RunwayFinanceMockup />
      </View>
    </View>
  );
}

// Simple logo placeholder
export function LogoPlaceholder({ size = 120 }: { size?: number }) {
  const logoStyles = StyleSheet.create({
    container: {
      width: size,
      height: size * 0.4,
      backgroundColor: colors.gray[800],
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.gray[700],
      borderStyle: 'dashed',
    },
    text: {
      fontFamily: fonts.body,
      fontSize: 10,
      color: colors.gray[500],
    },
  });

  return (
    <View style={logoStyles.container}>
      <Text style={logoStyles.text}>Logo</Text>
    </View>
  );
}

