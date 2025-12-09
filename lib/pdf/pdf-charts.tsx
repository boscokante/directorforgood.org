import React from 'react';
import { View, Text, Svg, Rect, Line, Circle, Path } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { colors, fonts, fontSize, spacing } from './pdf-styles';

// Economics comparison bar chart
export function EconomicsChart() {
  const chartStyles = StyleSheet.create({
    container: {
      padding: spacing.md,
    },
    title: {
      fontFamily: fonts.heading,
      fontSize: fontSize.small,
      color: colors.white,
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    chartArea: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: spacing.xl,
      height: 120,
      marginBottom: spacing.sm,
    },
    barContainer: {
      alignItems: 'center',
      width: 100,
    },
    bar: {
      width: 60,
      borderRadius: 4,
      marginBottom: spacing.xs,
    },
    barLabel: {
      fontFamily: fonts.body,
      fontSize: fontSize.tiny,
      color: colors.gray[300],
      textAlign: 'center',
    },
    barValue: {
      fontFamily: fonts.heading,
      fontSize: fontSize.body,
      color: colors.white,
      marginBottom: spacing.xs,
    },
    savings: {
      marginTop: spacing.sm,
      padding: spacing.sm,
      backgroundColor: colors.gray[800],
      borderRadius: 6,
      alignItems: 'center',
    },
    savingsText: {
      fontFamily: fonts.heading,
      fontSize: fontSize.small,
      color: colors.white,
    },
  });

  const maxHeight = 100;
  const traditionalHeight = maxHeight;
  const directorHeight = (200 / 400) * maxHeight;

  return (
    <View style={chartStyles.container}>
      <Text style={chartStyles.title}>Annual Backbone Cost (~$500-700k org)</Text>
      
      <View style={chartStyles.chartArea}>
        <View style={chartStyles.barContainer}>
          <Text style={chartStyles.barValue}>$360-450k</Text>
          <View style={{ ...chartStyles.bar, height: traditionalHeight, backgroundColor: colors.gray[600] }} />
          <Text style={chartStyles.barLabel}>Traditional</Text>
        </View>
        
        <View style={chartStyles.barContainer}>
          <Text style={chartStyles.barValue}>$180-270k</Text>
          <View style={{ ...chartStyles.bar, height: directorHeight, backgroundColor: colors.white }} />
          <Text style={chartStyles.barLabel}>With Director</Text>
        </View>
      </View>
      
      <View style={chartStyles.savings}>
        <Text style={chartStyles.savingsText}>Save $100-180k/year</Text>
      </View>
    </View>
  );
}

// Pod scaling diagram
export function ScalingDiagram() {
  const diagramStyles = StyleSheet.create({
    container: {
      padding: spacing.sm,
    },
    title: {
      fontFamily: fonts.heading,
      fontSize: fontSize.small,
      color: colors.white,
      marginBottom: spacing.sm,
      textAlign: 'center',
    },
    phases: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    phase: {
      alignItems: 'center',
      width: 100,
    },
    phaseCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.xs,
    },
    phaseNumber: {
      fontFamily: fonts.heading,
      fontSize: 20,
      color: colors.white,
    },
    phaseLabel: {
      fontFamily: fonts.body,
      fontSize: fontSize.tiny,
      color: colors.gray[300],
      textAlign: 'center',
    },
    phaseTitle: {
      fontFamily: fonts.heading,
      fontSize: fontSize.tiny,
      color: colors.white,
      marginBottom: 1,
    },
    arrow: {
      marginHorizontal: spacing.xs,
    },
  });

  return (
    <View style={diagramStyles.container}>
      <Text style={diagramStyles.title}>Pod Scaling Path</Text>
      
      <View style={diagramStyles.phases}>
        {/* Phase 1 */}
        <View style={diagramStyles.phase}>
          <View style={{ ...diagramStyles.phaseCircle, backgroundColor: colors.gray[700] }}>
            <Text style={diagramStyles.phaseNumber}>4</Text>
          </View>
          <Text style={diagramStyles.phaseTitle}>Year 1</Text>
          <Text style={diagramStyles.phaseLabel}>Proto-Pod</Text>
        </View>
        
        {/* Arrow */}
        <Svg width={40} height={20} style={diagramStyles.arrow}>
          <Path d="M0 10 L30 10 M25 5 L30 10 L25 15" stroke={colors.gray[500]} strokeWidth={2} fill="none" />
        </Svg>
        
        {/* Phase 2 */}
        <View style={diagramStyles.phase}>
          <View style={{ ...diagramStyles.phaseCircle, backgroundColor: colors.gray[600] }}>
            <Text style={diagramStyles.phaseNumber}>8</Text>
          </View>
          <Text style={diagramStyles.phaseTitle}>12-24mo</Text>
          <Text style={diagramStyles.phaseLabel}>Scale Pod</Text>
        </View>
        
        {/* Arrow */}
        <Svg width={40} height={20} style={diagramStyles.arrow}>
          <Path d="M0 10 L30 10 M25 5 L30 10 L25 15" stroke={colors.gray[500]} strokeWidth={2} fill="none" />
        </Svg>
        
        {/* Phase 3 */}
        <View style={diagramStyles.phase}>
          <View style={{ ...diagramStyles.phaseCircle, backgroundColor: colors.white }}>
            <Text style={{ ...diagramStyles.phaseNumber, color: colors.black }}>16</Text>
          </View>
          <Text style={diagramStyles.phaseTitle}>24+ mo</Text>
          <Text style={diagramStyles.phaseLabel}>Mature OS</Text>
        </View>
      </View>
    </View>
  );
}

// Timeline for roadmap
export function RoadmapTimeline() {
  const timelineStyles = StyleSheet.create({
    container: {
      padding: spacing.sm,
    },
    line: {
      height: 3,
      backgroundColor: colors.gray[700],
      marginVertical: spacing.sm,
      position: 'relative',
    },
    phases: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    phase: {
      alignItems: 'center',
      width: '30%',
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginBottom: spacing.xs,
    },
    phaseTitle: {
      fontFamily: fonts.heading,
      fontSize: fontSize.tiny,
      color: colors.white,
      textAlign: 'center',
      marginBottom: 1,
    },
    phaseItems: {
      marginTop: spacing.xs,
    },
    phaseItem: {
      fontFamily: fonts.body,
      fontSize: 8,
      color: colors.gray[400],
      textAlign: 'center',
      marginBottom: 1,
    },
  });

  return (
    <View style={timelineStyles.container}>
      <View style={timelineStyles.line} />
      
      <View style={timelineStyles.phases}>
        {/* 0-12 months */}
        <View style={timelineStyles.phase}>
          <View style={{ ...timelineStyles.dot, backgroundColor: colors.white }} />
          <Text style={timelineStyles.phaseTitle}>0-12 months</Text>
          <View style={timelineStyles.phaseItems}>
            <Text style={timelineStyles.phaseItem}>Hire team</Text>
            <Text style={timelineStyles.phaseItem}>Onboard 2-4 orgs</Text>
            <Text style={timelineStyles.phaseItem}>Ship v1 OS</Text>
          </View>
        </View>
        
        {/* 12-24 months */}
        <View style={timelineStyles.phase}>
          <View style={{ ...timelineStyles.dot, backgroundColor: colors.gray[500] }} />
          <Text style={timelineStyles.phaseTitle}>12-24 months</Text>
          <View style={timelineStyles.phaseItems}>
            <Text style={timelineStyles.phaseItem}>Scale to 8 orgs</Text>
            <Text style={timelineStyles.phaseItem}>Harden agents</Text>
            <Text style={timelineStyles.phaseItem}>Add capacity</Text>
          </View>
        </View>
        
        {/* 24+ months */}
        <View style={timelineStyles.phase}>
          <View style={{ ...timelineStyles.dot, backgroundColor: colors.gray[600] }} />
          <Text style={timelineStyles.phaseTitle}>24+ months</Text>
          <View style={timelineStyles.phaseItems}>
            <Text style={timelineStyles.phaseItem}>16-org pods</Text>
            <Text style={timelineStyles.phaseItem}>Multiple verticals</Text>
            <Text style={timelineStyles.phaseItem}>Mature OS</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// Agent workflow diagram
export function AgentWorkflowDiagram() {
  const workflowStyles = StyleSheet.create({
    container: {
      padding: spacing.sm,
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    box: {
      padding: spacing.sm,
      backgroundColor: colors.gray[800],
      borderRadius: 6,
      alignItems: 'center',
      width: 110,
    },
    boxHighlight: {
      padding: spacing.sm,
      backgroundColor: colors.white,
      borderRadius: 6,
      alignItems: 'center',
      width: 110,
    },
    boxText: {
      fontFamily: fonts.heading,
      fontSize: fontSize.tiny,
      color: colors.white,
      textAlign: 'center',
    },
    boxTextDark: {
      fontFamily: fonts.heading,
      fontSize: fontSize.tiny,
      color: colors.black,
      textAlign: 'center',
    },
    arrow: {
      marginHorizontal: spacing.xs,
    },
    label: {
      fontFamily: fonts.body,
      fontSize: 7,
      color: colors.gray[400],
      marginTop: 1,
    },
  });

  return (
    <View style={workflowStyles.container}>
      <View style={workflowStyles.row}>
        <View style={workflowStyles.box}>
          <Text style={workflowStyles.boxText}>AI Agents</Text>
          <Text style={workflowStyles.label}>Explore, compile, draft</Text>
        </View>
        
        <Svg width={40} height={20} style={workflowStyles.arrow}>
          <Path d="M0 10 L30 10 M25 5 L30 10 L25 15" stroke={colors.gray[500]} strokeWidth={2} fill="none" />
        </Svg>
        
        <View style={workflowStyles.box}>
          <Text style={workflowStyles.boxText}>FDDs + Directors</Text>
          <Text style={workflowStyles.label}>Review, edit, decide</Text>
        </View>
        
        <Svg width={40} height={20} style={workflowStyles.arrow}>
          <Path d="M0 10 L30 10 M25 5 L30 10 L25 15" stroke={colors.gray[500]} strokeWidth={2} fill="none" />
        </Svg>
        
        <View style={workflowStyles.boxHighlight}>
          <Text style={workflowStyles.boxTextDark}>Nonprofit</Text>
          <Text style={{ ...workflowStyles.label, color: colors.gray[600] }}>Focus on mission</Text>
        </View>
      </View>
    </View>
  );
}

// Simple pie-like cost breakdown
export function CostBreakdown() {
  const breakdownStyles = StyleSheet.create({
    container: {
      padding: spacing.sm,
    },
    title: {
      fontFamily: fonts.heading,
      fontSize: fontSize.tiny,
      color: colors.white,
      marginBottom: spacing.sm,
    },
    row: {
      flexDirection: 'row',
      marginBottom: spacing.xs,
      alignItems: 'center',
    },
    bar: {
      height: 14,
      borderRadius: 2,
      marginRight: spacing.xs,
    },
    label: {
      fontFamily: fonts.body,
      fontSize: 8,
      color: colors.gray[300],
      width: 70,
    },
    value: {
      fontFamily: fonts.heading,
      fontSize: 8,
      color: colors.white,
    },
  });

  const items = [
    { label: 'ED', value: '$100-150k', width: 100, color: colors.gray[600] },
    { label: 'Ops/Finance', value: '~$100k', width: 70, color: colors.gray[500] },
    { label: 'Development', value: '~$100k', width: 70, color: colors.gray[400] },
    { label: 'Comms/Ops', value: '$60-100k', width: 55, color: colors.gray[300] },
  ];

  return (
    <View style={breakdownStyles.container}>
      <Text style={breakdownStyles.title}>Traditional Backbone Costs</Text>
      {items.map((item, index) => (
        <View key={index} style={breakdownStyles.row}>
          <Text style={breakdownStyles.label}>{item.label}</Text>
          <View style={{ ...breakdownStyles.bar, width: item.width, backgroundColor: item.color }} />
          <Text style={breakdownStyles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}

