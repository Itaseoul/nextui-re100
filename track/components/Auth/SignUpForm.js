/* eslint-disable react/no-children-prop */
import {
	Button,
	FormControl,
	Icon,
	Input,
	InputGroup,
	InputRightAddon,
	Text,
	Tooltip,
	useColorMode,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useRef, useState } from "react";
import { BiArrowFromBottom, BiInfoCircle, BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/AuthProvider";
import { setEmailInputValue, setSubmitButtonState } from "../../store/auth/auth";
import { displayToast } from "../../utils/helpers";

export default function SignUpForm() {
	const { colorMode, toggleColorMode } = useColorMode();
	const bg = useColorModeValue("gray.400", "gray.900");
	const color = useColorModeValue("gray.900", "gray.400");
	const inputRef = useRef();
	const router = useRouter();
	const toast = useToast();
	const { enterAsGuest, sendEmailLink } = useAuth();
	const [isTooltip, setIsTooltip] = useState(false);
	const { emailInputValue, submitButton } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const signUpSuccessToastId = 1;
	const singUpErrorToastId = 2;
	const signInSuccessToastId = 3;
	const signInErrorToastId = 3;

	function handleTooltipVisibility(bool) {
		setIsTooltip(bool);
	}

	async function signIn() {
		try {
			await enterAsGuest();
			dispatch(setSubmitButtonState(true));
			displayToast(
				toast,
				signInSuccessToastId,
				"성공✨",
				// "게스트로 입장합니다....",
				() => {
					dispatch(setSubmitButtonState(false));
					dispatch(setEmailInputValue(""));
					router.reload();
				},
			);
		} catch ({ message }) {
			displayToast(toast, signInErrorToastId, "error", message, () => {
				inputRef.current.focus();
			});
		}
	}

	async function sendLink() {
		try {
			await sendEmailLink(emailInputValue, window.location.href);
			dispatch(setSubmitButtonState(true));
			displayToast(toast, signUpSuccessToastId, "🏃", `${emailInputValue} 에서 인증해 주세요.`, () => {
				dispatch(setSubmitButtonState(false));
				localStorage.setItem("service-email", emailInputValue);
				dispatch(setEmailInputValue(""));
				router.push("/");
			});
		} catch ({ message }) {
			displayToast(toast, singUpErrorToastId, "error", message, () => {
				inputRef.current.focus();
			});
		}
	}

	return (
		<form>
			<FormControl>
				<VStack spacing="20px">
					<InputGroup w="100%" >
						<Input
							_placeholder={{ color, opacity: 0.5 }}
							ref={inputRef}
							type="email"
							placeholder="이메일"
							isRequired
							value={emailInputValue}
							onChange={(e) => dispatch(setEmailInputValue(e.target.value))}
						/>
						<InputRightAddon
							children={
								<Tooltip
									isOpen={isTooltip}
									shouldWrapChildren
									hasArrow
									fontWeight="bold"
									placement="top"
									w="200px"
									label="이메일만 입력해주세요:) 인증 링크가 전송됩니다."
									aria-label="A tooltip">
									<Icon
										fontSize="20px"
										as={BiInfoCircle}
										onMouseEnter={() => handleTooltipVisibility(true)}
										onMouseLeave={() => handleTooltipVisibility(false)}
									/>
								</Tooltip>
							}
						/>
					</InputGroup>
					<Button w="100%" leftIcon={<BiArrowFromBottom />} onClick={sendLink} isDisabled={submitButton}>
						이메일 인증
					</Button>
					<Text>또는</Text>
					<Button w="100%" leftIcon={<BiUser />} isDisabled={submitButton} onClick={signIn}>
						게스트 체험
					</Button>
					<Text fontSize="10px" textAlign="center">
						&copy; 1W for Earth
					</Text>
				</VStack>
			</FormControl>
		</form>
	);
}
