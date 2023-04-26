import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function LinkComponent({
  url,
  children,
  external,
  ...rest
}: Record<string, string>) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(url);
  }, [navigate, url]);

  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;
  const DEFAULT_PROPS = url ? { cursor: "pointer" } : {};

  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    return (
      <a
        {...rest}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={DEFAULT_PROPS}
      >
        {children}
      </a>
    );
  }

  return (
    <a {...rest} onClick={handleClick} role="alert" style={DEFAULT_PROPS}>
      {children}
    </a>
  );
}
