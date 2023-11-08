import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
	const location = useLocation();
	let extractedKeyword = keyword;

	// Extract the keyword from the URL, if present
	if (keyword.includes("?keyword=")) {
		extractedKeyword = keyword.split("?keyword=")[1].split("&")[0];
	}

	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((x) => (
					<LinkContainer
						key={x + 1}
						to={
							!isAdmin
								? {
										pathname: location.pathname,
										search: `?keyword=${extractedKeyword}&page=${x + 1}`,
								  }
								: {
										pathname: "/admin/productlist/",
										search: `?keyword=${extractedKeyword}&page=${x + 1}`,
								  }
						}
					>
						<Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	);
}

export default Paginate;
