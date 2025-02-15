function virtualDom(tag, props, ...children) {
  return {
    tag: tag || null,
    props: props || null,
    children: children || [],
  };
}

function renderDom(vd, container) {
  if (!vd.tag) {
    throw new Error("No tag has been declared!");
  }

  if (!container) {
    throw new Error("No container has been declared!");
  }

  const element = document.createElement(vd.tag);

  // Assign props (attributes)
  if (vd.props) {
    for (const [key, value] of Object.entries(vd.props)) {
      element.setAttribute(key, value);
    }
  }

  // Assign children
  if (vd.children && vd.children.length > 0) {
    vd.children.forEach((child) => {
      if (typeof child === "string" || typeof child === "number") {
        element.appendChild(document.createTextNode(child));
      } else if (typeof child === "object" && child !== null) {
        element.appendChild(renderDom(child, container));
      }
    });
  }

  container.appendChild(element);
  return element;
}

// Example usage
const blogPage = virtualDom(
  "div",
  {
    class: "container",
    style:
      "font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);",
  },
  // هدر
  virtualDom(
    "header",
    {
      class: "header",
      style:
        "background-color: #4CAF50; color: white; padding: 20px; border-radius: 8px; text-align: center;",
    },
    virtualDom("h1", { style: "margin: 0; font-size: 2.5rem;" }, "وبلاگ من"),
    virtualDom(
      "nav",
      {
        class: "navbar",
        style:
          "display: flex; justify-content: center; gap: 1rem; margin-top: 10px;",
      },
      virtualDom(
        "a",
        {
          href: "#home",
          style: "color: white; text-decoration: none; font-size: 1.1rem;",
        },
        "خانه"
      ),
      virtualDom(
        "a",
        {
          href: "#about",
          style: "color: white; text-decoration: none; font-size: 1.1rem;",
        },
        "درباره ما"
      ),
      virtualDom(
        "a",
        {
          href: "#contact",
          style: "color: white; text-decoration: none; font-size: 1.1rem;",
        },
        "تماس با ما"
      )
    )
  ),
  // بخش اصلی
  virtualDom(
    "main",
    {
      class: "main-content",
      style:
        "display: flex; flex-direction: column; gap: 20px; margin-top: 20px;",
    },
    virtualDom(
      "article",
      {
        class: "blog-post",
        style:
          "background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);",
      },
      virtualDom(
        "h2",
        { style: "margin: 0 0 10px 0; font-size: 1.8rem; color: #333;" },
        "پست اول: معرفی جاوااسکریپت"
      ),
      virtualDom(
        "p",
        {
          style:
            "margin: 0 0 15px 0; font-size: 1.1rem; color: #555; line-height: 1.6;",
        },
        "جاوااسکریپت یک زبان برنامه‌نویسی قدرتمند و انعطاف‌پذیر است که برای توسعه وب استفاده می‌شود. این زبان به شما امکان می‌دهد تا وب‌سایت‌های پویا و تعاملی ایجاد کنید."
      ),
      virtualDom(
        "a",
        {
          href: "#read-more",
          style: "color: #4CAF50; text-decoration: none; font-weight: bold;",
        },
        "ادامه مطلب..."
      )
    ),
    virtualDom(
      "article",
      {
        class: "blog-post",
        style:
          "background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);",
      },
      virtualDom(
        "h2",
        { style: "margin: 0 0 10px 0; font-size: 1.8rem; color: #333;" },
        "پست دوم: چرا React محبوب است؟"
      ),
      virtualDom(
        "p",
        {
          style:
            "margin: 0 0 15px 0; font-size: 1.1rem; color: #555; line-height: 1.6;",
        },
        "React یک کتابخانه جاوااسکریپتی است که توسط فیسبوک توسعه داده شده است. این کتابخانه به دلیل معماری مبتنی بر کامپوننت‌ها و عملکرد سریع، بسیار محبوب است."
      ),
      virtualDom(
        "a",
        {
          href: "#read-more",
          style: "color: #4CAF50; text-decoration: none; font-weight: bold;",
        },
        "ادامه مطلب..."
      )
    )
  ),
  // سایدبار
  virtualDom(
    "aside",
    {
      class: "sidebar",
      style:
        "background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin-top: 20px;",
    },
    virtualDom(
      "h3",
      { style: "margin: 0 0 10px 0; font-size: 1.5rem; color: #333;" },
      "دسته‌بندی‌ها"
    ),
    virtualDom(
      "ul",
      { style: "list-style: none; padding: 0;" },
      virtualDom(
        "li",
        null,
        virtualDom(
          "a",
          {
            href: "#tech",
            style: "color: #4CAF50; text-decoration: none; font-size: 1.1rem;",
          },
          "تکنولوژی"
        )
      ),
      virtualDom(
        "li",
        null,
        virtualDom(
          "a",
          {
            href: "#programming",
            style: "color: #4CAF50; text-decoration: none; font-size: 1.1rem;",
          },
          "برنامه‌نویسی"
        )
      ),
      virtualDom(
        "li",
        null,
        virtualDom(
          "a",
          {
            href: "#web-dev",
            style: "color: #4CAF50; text-decoration: none; font-size: 1.1rem;",
          },
          "توسعه وب"
        )
      )
    ),
    virtualDom(
      "h3",
      { style: "margin: 0 0 10px 0; font-size: 1.5rem; color: #333;" },
      "آخرین مطالب"
    ),
    virtualDom(
      "ul",
      { style: "list-style: none; padding: 0;" },
      virtualDom(
        "li",
        null,
        virtualDom(
          "a",
          {
            href: "#post1",
            style: "color: #4CAF50; text-decoration: none; font-size: 1.1rem;",
          },
          "معرفی جاوااسکریپت"
        )
      ),
      virtualDom(
        "li",
        null,
        virtualDom(
          "a",
          {
            href: "#post2",
            style: "color: #4CAF50; text-decoration: none; font-size: 1.1rem;",
          },
          "چرا React محبوب است؟"
        )
      )
    )
  ),
  // فوتر
  virtualDom(
    "footer",
    {
      class: "footer",
      style:
        "background-color: #4CAF50; color: white; padding: 10px; border-radius: 8px; text-align: center; margin-top: 20px;",
    },
    virtualDom(
      "p",
      { style: "margin: 0; font-size: 1rem;" },
      "تمامی حقوق محفوظ است. © ۲۰۲۵ وبلاگ من"
    )
  )
);
//render the Dom--------------------------------------
renderDom(blogPage, document.body);
