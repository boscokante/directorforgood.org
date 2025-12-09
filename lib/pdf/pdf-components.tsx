import React from 'react';
import { Page, View, Text, Svg, Path, Circle, Rect, Line } from '@react-pdf/renderer';
import { styles, colors, fontSize, spacing, slide, fonts } from './pdf-styles';
import { StyleSheet } from '@react-pdf/renderer';

// Slide wrapper component
interface SlideProps {
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  pageNumber?: number;
}

export function Slide({ children, variant = 'dark', pageNumber }: SlideProps) {
  return (
    <Page size={[slide.width, slide.height]} style={variant === 'dark' ? styles.page : styles.pageLight}>
      {children}
      {pageNumber && (
        <Text style={styles.footer}>{pageNumber}</Text>
      )}
    </Page>
  );
}

// Title component
interface TitleProps {
  children: React.ReactNode;
  subtitle?: string;
}

export function Title({ children, subtitle }: TitleProps) {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

// Section heading
interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
}

export function Heading({ children, level = 1 }: HeadingProps) {
  const headingStyles = {
    1: styles.heading,
    2: styles.subheading,
    3: { ...styles.subheading, fontSize: fontSize.body, fontFamily: fonts.heading },
  };
  return <Text style={headingStyles[level]}>{children}</Text>;
}

// Bullet list
interface BulletListProps {
  items: string[];
  color?: string;
}

export function BulletList({ items, color = colors.gray[300] }: BulletListProps) {
  return (
    <View>
      {items.map((item, index) => (
        <View key={index} style={styles.bulletRow}>
          <View style={styles.bulletDot} />
          <Text style={{ ...styles.bulletText, color }}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

// Card/Box component
interface CardProps {
  children: React.ReactNode;
  variant?: 'filled' | 'bordered' | 'highlight';
  style?: object;
}

export function Card({ children, variant = 'filled', style }: CardProps) {
  const cardStyles = {
    filled: styles.card,
    bordered: styles.cardBordered,
    highlight: styles.cardHighlight,
  };
  return <View style={{ ...cardStyles[variant], ...style }}>{children}</View>;
}

// Two column layout
interface TwoColumnProps {
  left: React.ReactNode;
  right: React.ReactNode;
  gap?: number;
}

export function TwoColumn({ left, right, gap = spacing.xl }: TwoColumnProps) {
  return (
    <View style={{ ...styles.twoColumn, gap }}>
      <View style={styles.columnHalf}>{left}</View>
      <View style={styles.columnHalf}>{right}</View>
    </View>
  );
}

// Bordered section with left border
interface BorderedSectionProps {
  children: React.ReactNode;
  borderColor?: string;
}

export function BorderedSection({ children, borderColor = colors.white }: BorderedSectionProps) {
  return (
    <View style={{ flexDirection: 'row', marginBottom: spacing.md }}>
      <View style={{ ...styles.dividerVertical, backgroundColor: borderColor }} />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

// Image placeholder
interface ImagePlaceholderProps {
  width: number;
  height: number;
  label?: string;
}

export function ImagePlaceholder({ width, height, label }: ImagePlaceholderProps) {
  return (
    <View style={{ ...styles.imagePlaceholder, width, height }}>
      {label && <Text style={styles.small}>{label}</Text>}
    </View>
  );
}

// SVG Icons for PDF
export function IconUsers({ size = 24, color = colors.white }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <Circle cx={9} cy={7} r={4} stroke={color} strokeWidth={2} fill="none" />
      <Path
        d="M22 21v-2a4 4 0 0 0-3-3.87"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M16 3.13a4 4 0 0 1 0 7.75"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

export function IconShield({ size = 24, color = colors.white }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

export function IconDollar({ size = 24, color = colors.white }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1={12} y1={1} x2={12} y2={23} stroke={color} strokeWidth={2} />
      <Path
        d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

export function IconTrending({ size = 24, color = colors.white }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M23 6l-9.5 9.5-5-5L1 18"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <Path
        d="M17 6h6v6"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

export function IconBot({ size = 24, color = colors.white }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x={4} y={8} width={16} height={12} rx={2} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M12 8V4H8" stroke={color} strokeWidth={2} fill="none" />
      <Line x1={2} y1={14} x2={4} y2={14} stroke={color} strokeWidth={2} />
      <Line x1={20} y1={14} x2={22} y2={14} stroke={color} strokeWidth={2} />
      <Line x1={9} y1={13} x2={9} y2={15} stroke={color} strokeWidth={2} />
      <Line x1={15} y1={13} x2={15} y2={15} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function IconFileText({ size = 24, color = colors.white }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke={color}
        strokeWidth={2}
        fill="none"
      />
      <Path d="M14 2v6h6" stroke={color} strokeWidth={2} fill="none" />
      <Line x1={16} y1={13} x2={8} y2={13} stroke={color} strokeWidth={2} />
      <Line x1={16} y1={17} x2={8} y2={17} stroke={color} strokeWidth={2} />
      <Line x1={10} y1={9} x2={8} y2={9} stroke={color} strokeWidth={2} />
    </Svg>
  );
}

export function IconCheckCircle({ size = 24, color = colors.white }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M9 12l2 2 4-4" stroke={color} strokeWidth={2} fill="none" />
    </Svg>
  );
}

export function IconTarget({ size = 24, color = colors.white }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} fill="none" />
      <Circle cx={12} cy={12} r={6} stroke={color} strokeWidth={2} fill="none" />
      <Circle cx={12} cy={12} r={2} stroke={color} strokeWidth={2} fill="none" />
    </Svg>
  );
}

export function IconClock({ size = 24, color = colors.white }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={2} fill="none" />
      <Path d="M12 6v6l4 2" stroke={color} strokeWidth={2} fill="none" />
    </Svg>
  );
}

// Icon with background
interface IconBoxProps {
  icon: React.ReactNode;
  backgroundColor?: string;
}

export function IconBox({ icon, backgroundColor = colors.gray[800] }: IconBoxProps) {
  return (
    <View style={{ ...styles.iconContainer, backgroundColor }}>
      {icon}
    </View>
  );
}

// Stat/Number highlight
interface StatProps {
  value: string;
  label: string;
  valueColor?: string;
}

export function Stat({ value, label, valueColor = colors.white }: StatProps) {
  const statStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    value: {
      fontFamily: fonts.heading,
      fontSize: 24,
      color: valueColor,
      marginBottom: 2,
    },
    label: {
      fontFamily: fonts.body,
      fontSize: fontSize.tiny,
      color: colors.gray[400],
    },
  });
  
  return (
    <View style={statStyles.container}>
      <Text style={statStyles.value}>{value}</Text>
      <Text style={statStyles.label}>{label}</Text>
    </View>
  );
}

// Team member placeholder
interface TeamMemberProps {
  name: string;
  role: string;
}

export function TeamMember({ name, role }: TeamMemberProps) {
  const memberStyles = StyleSheet.create({
    container: {
      alignItems: 'center',
      width: 100,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.gray[700],
      marginBottom: spacing.xs,
      alignItems: 'center',
      justifyContent: 'center',
    },
    initials: {
      fontFamily: fonts.heading,
      fontSize: fontSize.body,
      color: colors.gray[400],
    },
    name: {
      fontFamily: fonts.heading,
      fontSize: fontSize.tiny,
      color: colors.white,
      textAlign: 'center',
      marginBottom: 1,
    },
    role: {
      fontFamily: fonts.body,
      fontSize: 7,
      color: colors.gray[400],
      textAlign: 'center',
    },
  });
  
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  
  return (
    <View style={memberStyles.container}>
      <View style={memberStyles.avatar}>
        <Text style={memberStyles.initials}>{initials}</Text>
      </View>
      <Text style={memberStyles.name}>{name}</Text>
      <Text style={memberStyles.role}>{role}</Text>
    </View>
  );
}

