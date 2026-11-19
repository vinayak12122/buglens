# Routing

BugLens uses React Router for client-side navigation.

Routing allows users to move between pages without triggering full browser reloads. Individual views are loaded dynamically while preserving application state and improving user experience.

Major route categories include:

- Authentication pages
- Dashboard pages
- Project management pages
- Issue management pages
- Log inspection pages
- Documentation pages
- Settings pages

Protected routes are used to prevent unauthorized access to project dashboards and monitoring features.

Authentication state is checked before allowing access to secured sections of the platform.

This routing approach improves navigation speed and reduces unnecessary network activity.