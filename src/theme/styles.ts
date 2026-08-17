import { Platform, StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: colors.textSecondary,
    fontSize: 15,
  },

  /* Login Card Styles */
  loginCard: {
    backgroundColor: colors.cardBackground,
    width: '100%',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    // Note: React Native Web handles box shadows using standard CSS styles
    ...Platform.select({
      web: {
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
      }
    }),
  },
  loginCardDesktop: {
    marginTop: 100,
    maxWidth: 450,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBadge: {
    backgroundColor: colors.badgeBackground,
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.badgeBorder,
  },
  logoText: {
    fontSize: 28,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  appSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },

  /* Banners */
  infoBanner: {
    backgroundColor: colors.infoBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.infoBorder,
  },
  infoBannerTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.infoText,
    marginBottom: 4,
  },
  infoBannerBody: {
    fontSize: 12,
    color: colors.infoBodyText,
    lineHeight: 18,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  errorBanner: {
    backgroundColor: colors.errorBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.errorBorder,
  },
  errorText: {
    fontSize: 13,
    color: colors.errorText,
  },

  /* Form Elements */
  formContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  inputField: {
    backgroundColor: colors.darkBackground,
    color: colors.textPrimary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  inputFieldFocused: {
    borderColor: colors.primary,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  actionButtonHovered: {
    backgroundColor: colors.primaryHover,
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
  actionButtonDisabled: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* Switch Link */
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  switchText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  switchLink: {
    color: colors.primaryBorder,
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* Dashboard Styles */
  dashboardContainer: {
    width: '100%',
    maxWidth: 900,
    paddingVertical: 12,
  },
  welcomeCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  welcomeHeading: {
    fontSize: 14,
    color: colors.textMuted,
  },
  welcomeUser: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 2,
  },
  sessionBadge: {
    fontSize: 11,
    color: colors.textSecondary,
    backgroundColor: colors.badgeBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: 'flex-start',
    borderWidth: 0.5,
    borderColor: colors.badgeBorder,
  },
  logoutBtn: {
    backgroundColor: colors.errorBackground,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  logoutBtnHovered: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutBtnPressed: {
    opacity: 0.7,
  },
  logoutBtnText: {
    color: colors.errorText,
    fontWeight: 'bold',
    fontSize: 13,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },

  refreshBtn: {
    backgroundColor: colors.badgeBackground,
    borderWidth: 1,
    borderColor: colors.badgeBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  refreshBtnHovered: {
    backgroundColor: '#2e2e3f',
  },
  refreshBtnPressed: {
    opacity: 0.7,
  },
  refreshBtnDisabled: {
    opacity: 0.5,
  },
  refreshBtnText: {
    color: colors.badgeText,
    fontWeight: 'bold',
    fontSize: 13,
  },

  /* Grid of Stat Cards */
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  statCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    margin: 8,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: '40%', // Becomes a 2x2 grid on wider screens, or stacks on narrow mobile screens
    minWidth: 250,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  statCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primaryBorder,
    letterSpacing: 1,
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.accent,
    marginVertical: 8,
  },
  statTimestamp: {
    fontSize: 11,
    color: '#475569',
  },

  platformFooter: {
    backgroundColor: colors.footerBackground,
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: colors.footerBorder,
  },
  platformFooterTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#e2e8f0',
    marginBottom: 6,
  },
  platformFooterBody: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
});
