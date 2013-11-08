{
	id: "100",
	name: "New Survey",
	description: "What is diversity Survey",
	realized: 13,

	audience: {
		country: "United States",
		filter_type: 0, // 0: no filter; 1: age-gender; 2: screening question
		age: ["18-24", "+55"],
		gender: ["Male", "Female"],

		screening_question: {
			id: "sq1",
			text: "What is diversity?",
			order: "RANDOMIZE",
			completed: 13,

			answers: [{
				id: "sa1",
				text: "I don't know",
				flagged: false,
				pinned: true,
				selected: 4,
				pixels: ["url_a", "url_b"]
			}, {
				id: "sa2",
				text: "I know",
				flagged: true,
				pinned: true,
				selected: 4,
				pixels: ["url_a", "url_b"]
			}]
		}
	},

	questions: [{
		text: "Who will be the first pick in Fantasy Football?",
		order: "RANDOMLY_REVERSE",
		type: 1, // 0: single_answer; 1: multiple_choise
		completed: 0,

		answers: [{
			text: "Aaron Rodgers",
			pinned: false,
			selected: 3,
			pixels: []
		}, {
			text: "Doug Martin",
			pinned: true,
			selected: 0,
			pixels: []
		}]
	}, {
		text: "What is a Pro Tip?",
		order: "DISPLAY_IN_SET",
		type: 1, // 0: single_answer; 1: multiple_choise
		completed: 0,

		answers: [{
			text: "The correct way to do something",
			pinned: true,
			selected: 133,
			pixels: []
		}]
	}]
}