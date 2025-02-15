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
  { class: "container" },
  // هدر
  virtualDom(
    "header",
    { class: "header" },
    virtualDom("h1", null, "وبلاگ من"),
    virtualDom(
      "nav",
      { class: "navbar", style: "display:flex ; gap:1rem" },
      virtualDom("a", { href: "#home" }, "خانه"),
      virtualDom("a", { href: "#about" }, "درباره ما"),
      virtualDom("a", { href: "#contact" }, "تماس با ما")
    )
  ),
  // بخش اصلی
  virtualDom(
    "main",
    { class: "main-content" },
    virtualDom(
      "article",
      { class: "blog-post" },
      virtualDom("h2", null, "پست اول: معرفی جاوااسکریپت"),
      virtualDom(
        "p",
        null,
        "جاوااسکریپت یک زبان برنامه‌نویسی قدرتمند و انعطاف‌پذیر است که برای توسعه وب استفاده می‌شود. این زبان به شما امکان می‌دهد تا وب‌سایت‌های پویا و تعاملی ایجاد کنید."
      ),
      virtualDom("a", { href: "#read-more" }, "ادامه مطلب...")
    ),
    virtualDom(
      "article",
      { class: "blog-post" },
      virtualDom("h2", null, "پست دوم: چرا React محبوب است؟"),
      virtualDom(
        "p",
        null,
        "React یک کتابخانه جاوااسکریپتی است که توسط فیسبوک توسعه داده شده است. این کتابخانه به دلیل معماری مبتنی بر کامپوننت‌ها و عملکرد سریع، بسیار محبوب است."
      ),
      virtualDom("a", { href: "#read-more" }, "ادامه مطلب...")
    )
  ),
  // سایدبار
  virtualDom(
    "aside",
    { class: "sidebar" },
    virtualDom("h3", null, "دسته‌بندی‌ها"),
    virtualDom(
      "ul",
      null,
      virtualDom("li", null, virtualDom("a", { href: "#tech" }, "تکنولوژی")),
      virtualDom(
        "li",
        null,
        virtualDom("a", { href: "#programming" }, "برنامه‌نویسی")
      ),
      virtualDom("li", null, virtualDom("a", { href: "#web-dev" }, "توسعه وب"))
    ),
    virtualDom("h3", null, "آخرین مطالب"),
    virtualDom(
      "ul",
      null,
      virtualDom(
        "li",
        null,
        virtualDom("a", { href: "#post1" }, "معرفی جاوااسکریپت")
      ),
      virtualDom(
        "li",
        null,
        virtualDom("a", { href: "#post2" }, "چرا React محبوب است؟")
      )
    )
  ),
  // فوتر
  virtualDom(
    "footer",
    { class: "footer" },
    virtualDom("p", null, "تمامی حقوق محفوظ است. © ۲۰۲۵ وبلاگ من")
  )
);

//render the Dom--------------------------------------
renderDom(blogPage, document.body);
