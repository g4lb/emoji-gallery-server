# Emoji Gallery

The Emoji Gallery is a feature that allows users to add predefined emojis to their movies. This README file provides an overview of the functionality and flow of the Emoji Gallery.

## Flow

1. User Taps 'Add emoji': When the user selects the option to add an emoji, the emoji gallery is opened.
2. Emojis Gallery: The user is presented with a gallery of emojis to choose from.
   - In-House Emojis: The user can select emojis that are provided within the application.
   - Previous Uploaded Emojis: The user can also select emojis from their previously uploaded emojis.
3. Emoji Tab: The emoji gallery is organized into tabs for better categorization and selection.
   - Adding an Emoji: When the user clicks on an emoji, the modal is closed, and the selected emoji is displayed on the existing movie.
   - Uploading User Emoji: Users have certain limits on the number of emojis they can add based on their account type:
     - 'Free' users can add up to 5 emojis.
     - 'Premium' users can add up to 100 emojis.
     - 'Business' users have no limits on the number of emojis they can add.
   - Deleting User Emoji: Users can select emojis from their 'uploads' tab and delete them if desired.
4. Gallery Emoji: Not all emojis are available to all users. There are three types of emojis:
   - Free Emojis: These are available to 'Free' users only.
   - Premium Emojis: These are available to 'Premium' users in addition to free emojis.
   - Business Emojis: These are available to 'Business' users and include all emojis.
   - Emojis are ordered based on the 'order' field.
   - Only 'active' emojis are returned to the user.

# Architecture and Design 

<p align="center">
  <img src="https://i.ibb.co/XCwS7rB/Untitled-drawio-4.png" width="500" title="hover text">
</p>
