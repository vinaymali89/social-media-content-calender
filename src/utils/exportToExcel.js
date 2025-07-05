import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportScheduleToExcel(posts, selectedDates) {
  const workbook = XLSX.utils.book_new();

  selectedDates.forEach((date) => {
    const postsForDate = posts.filter((p) => p.scheduleDate === date);

    if (postsForDate.length === 0) return;

      const rows = postsForDate.map((post) => ({
        Date: post.scheduleDate, 
        'Page Name': post.pageName,
        Category: post.category,
        'Post Type': post.postType,
        Followers: post.followers,
        Likes: post.likes,
        Views: post.views,
        Shares: post.shares,
        Reach: post.reach,
        Impressions: post.impressions,
        'Post Link': post.postLink,
      }));

    rows.push({
      Date : '─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────',
    });

    rows.push({
      Date: 'TOTAL',
      'Page Name': '',
      Category: '-',
      'Post Type': postsForDate.length,
      Followers: '',
      Likes: '',
      Views: '',
      Shares: '',
      Reach: '',
      Impressions: '',
      'Post Link': '',
    });

    const sheet = XLSX.utils.json_to_sheet(rows, { origin: 'A1' });

    const headers = Object.keys(rows[0]);
    sheet['!cols'] = headers.map((key) =>
      key === 'Post Link' ? { wch: 28 } : { wch: 13 }
    );
    XLSX.utils.book_append_sheet(workbook, sheet, date);
  });

  const wbout = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'Content-Schedule.xlsx');
}
