// import RNFetchBlob from 'rn-fetch-blob';
import fs from 'react-native-fs';
// import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const coursesDirectory = 'lib/courses';
// path.join(process.cwd(), 'courses');

export function getSortedCoursesData() {
  // Get file names under /courses
  const fileNames = fs.readdir(coursesDirectory);
  // const fileNames = RNFetchBlob.fs
  //   .ls(coursesDirectory)
  //   .then((files) => {
  //     return files;
  //   })
  //   .catch((error) => console.log(error));
  const allCoursesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = 'lib/courses' + fileName;
    // path.join(coursesDirectory, fileName);
    const fileContents = fs.readFile(fullPath, 'utf8');

    // const fileContents = RNFetchBlob.fs
    //   .readFile(fullPath, 'base64')
    //   .then((data) => {
    //     return data;
    //   });

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort courses by date
  return allCoursesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllCourseIds() {
  const fileNames = fs.readdir(coursesDirectory);
  // const fileNames = RNFetchBlob.fs
  //   .ls(coursesDirectory)
  //   .then((files) => {
  //     return files;
  //   })
  //   .catch((error) => console.log(error));

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getCourseData(id) {
  const fullPath = coursesDirectory + `${id}.md`;
  // path.join(coursesDirectory, `${id}.md`);
  const fileContents = fs.readFile(fullPath, 'utf8');
  // const fileContents = RNFetchBlob.fs
  //   .readFile(fullPath, 'base64')
  //   .then((data) => {
  //     return data;
  //   });

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
