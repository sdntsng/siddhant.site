import Image from "next/image";
import Link from "next/link";
import React from "react";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: any) {
  return (
    <figure className="my-8 flex flex-col items-center">
      <Image
        alt={props.alt}
        className="rounded-xl shadow-md transition-all hover:scale-[1.01]"
        {...props}
      />
      {props.alt && (
        <figcaption className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-3 italic font-medium px-4 max-w-2xl mx-auto">
          {props.alt}
        </figcaption>
      )}
    </figure>
  );
}

// This replaces rehype-slug
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: any) => {
    let slug = slugify(children || "");
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

function StyledImg(props: any) {
  return (
    <img
      {...props}
      className="rounded-xl shadow-md transition-all hover:scale-[1.01]"
    />
  );
}

function StyledFigure(props: any) {
  return <figure className="my-8 flex flex-col items-center" {...props} />;
}

function StyledFigcaption(props: any) {
  return (
    <figcaption
      className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-3 italic font-medium px-4 max-w-2xl mx-auto"
      {...props}
    />
  );
}

export const globalComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  img: StyledImg,
  figure: StyledFigure,
  figcaption: StyledFigcaption,
  a: CustomLink,
  Table,
};
