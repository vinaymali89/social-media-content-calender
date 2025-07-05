# Social Media Content Calendar (SMCC)

A fully functional and visually polished Social Media Content Calendar built in **React.js**. This project lets users:

* Plan content for social media platforms
* Drag and drop posts onto selected dates
* Filter posts by category
* Export content schedules to Excel with detailed analytics
* Add custom posts and store them persistently

---

## Features

### Core Functionality

* Select multiple calendar dates dynamically
* View scheduled posts date-wise
* Manual drag-and-drop post assignment
* Followers-based post prioritization
* Excel export per selected date
* Total post count + visual separation rows in Excel

### Extras

* Dark Mode support
* Toast notifications (react-toastify)
* Add new post modal (with form validation)
* LocalStorage integration (for persistence)
* Attractive UI with Tailwind + Bootstrap
* Static Header & Footer with logo support

### Optional Features

* Category filter before entering app (modal)
* Unscheduled vs Scheduled posts separation
* Fallback to JSON if LocalStorage is empty

---

## 🛠 Tech Stack

| Technology          | Purpose                      |
| ------------------- | ---------------------------- |
| React.js            | Frontend Framework           |
| Redux Toolkit       | State Management             |
| Tailwind CSS        | Utility-first CSS            |
| Bootstrap           | Grid system & basic layout   |
| React Beautiful DnD | Drag-and-drop implementation |
| SheetJS (xlsx)      | Excel export logic           |
| FileSaver.js        | To save .xlsx file locally   |
| React Toastify      | Toast message system         |

---

##  Folder Structure

```
src/
├── assets/             # Logo, images
├── components/         # UI Components (Calendar, Modal, etc.)
├── data/               # posts.json
├── features/           # Redux slices
├── shared-components/  # Header & Footer
├── utils/              # Excel + distributePosts helpers
├── App.js              # Main container
├── index.js            # Entry point
```

---

##  Installation

```bash
git clone https://github.com/vinaymali89/social-media-content-calender.git
cd social-media-calendar
npm install
npm start
```

---

## Excel Export Example

* Each date has its own worksheet
* Includes post details and total row
* Follower counts, views, shares, likes shown
* Clean design with proper formatting and borders

---

## How Posts are Distributed

* Pages with higher followers are given priority
* Posts are balanced across selected dates
* Manual override via drag and drop

---

## Data Persistence

* App uses `localStorage` under key `scheduledPosts`
* All newly added or modified posts are stored there
* Reset button clears localStorage and state

---

## To Do (Optional Enhancements)

* Search bar for posts
* Edit existing post
* Pagination for large post lists

---

##  Author

* Developed by **Vinay Mali**

If you find this useful, give it a on GitHub!

---

## License

This project is licensed under the MIT License.
